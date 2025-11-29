import pool from '../db.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { sendPinEmail } from '../services/email.service.js';
import { generateSignedPdf } from '../services/pdf.service.js';

const PIN_EXPIRATION_MINUTES = 10;
const SALT_ROUNDS = 10;

export async function requestSign(req, res) {
  try {
    const { documentId, documentHash, signerId, sendEmail = true } = req.body;
    if (!documentId || !documentHash || !signerId) {
      return res.status(400).json({ error: 'Faltan campos documentId | documentHash | signerId' });
    }

    const signature_token = uuidv4();
    const pin = (Math.floor(100000 + Math.random() * 900000)).toString();
    const pin_hash = await bcrypt.hash(pin, SALT_ROUNDS);
    const expires_at = new Date(Date.now() + PIN_EXPIRATION_MINUTES * 60000);

    const insertQuery = `
      INSERT INTO signatures (signature_token, document_id, document_hash, signer_id, pin_hash, status, expires_at)
      VALUES ($1,$2,$3,$4,$5,'pending',$6) RETURNING id, signature_token;
    `;
    const result = await pool.query(insertQuery, [signature_token, documentId, documentHash, signerId, pin_hash, expires_at]);
    const signatureRecord = result.rows[0];

    if (sendEmail) {
      await sendPinEmail({ to: signerId, pin, documentId });
    } else {
      console.log('PIN (dev):', pin);
    }

    return res.status(201).json({ success: true, signature_token, expires_at });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error en server' });
  }
}

export async function confirmSign(req, res) {
  try {
    const { signature_token, pin, clientIp } = req.body;
    if (!signature_token || !pin) return res.status(400).json({ error: 'signature_token y pin requeridos' });

    const q = `SELECT * FROM signatures WHERE signature_token=$1`;
    const r = await pool.query(q, [signature_token]);
    const sig = r.rows[0];
    if (!sig) return res.status(404).json({ error: 'Sesión de firma no encontrada' });

    if (sig.status !== 'pending') return res.status(400).json({ error: `Firma estado ${sig.status}` });

    if (new Date(sig.expires_at) < new Date()) {
      await pool.query('UPDATE signatures SET status=$1 WHERE id=$2', ['expired', sig.id]);
      return res.status(400).json({ error: 'PIN expirado' });
    }

    const ok = await bcrypt.compare(pin, sig.pin_hash);
    if (!ok) {
      await pool.query('UPDATE signatures SET status=$1 WHERE id=$2', ['failed', sig.id]);
      return res.status(401).json({ error: 'PIN incorrecto' });
    }

    const pdfResult = await generateSignedPdf({
      documentId: sig.document_id,
      documentHash: sig.document_hash,
      signerId: sig.signer_id,
      signatureId: sig.id
    });

    const signed_at = new Date();
    await pool.query(
      `UPDATE signatures SET status='signed', signed_at=$1, ip_address=$2, signed_pdf_path=$3 WHERE id=$4`,
      [signed_at, clientIp || null, pdfResult.path, sig.id]
    );

    return res.json({ success: true, signature_id: sig.id, signed_pdf_path: pdfResult.path });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error en confirmSign' });
  }
}

export async function verifySign(req, res) {
  try {
    const { signature_id } = req.params;
    const q = `SELECT * FROM signatures WHERE id=$1`;
    const r = await pool.query(q, [signature_id]);
    const sig = r.rows[0];
    if (!sig) return res.status(404).json({ error: 'Firma no encontrada' });

    return res.json({
      id: sig.id,
      status: sig.status,
      document_id: sig.document_id,
      document_hash: sig.document_hash,
      signer_id: sig.signer_id,
      created_at: sig.created_at,
      signed_at: sig.signed_at,
      signed_pdf_path: sig.signed_pdf_path
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error en verifySign' });
  }
}
