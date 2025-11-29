import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // true si usas 465
  auth: {
    user: process.env.SMTP_USER || '', // si no hay, solo log
    pass: process.env.SMTP_PASS || ''
  }
});

/**
 * Envía un PIN por email o, en dev, lo imprime en consola.
 * @param {Object} param0
 * @param {string} param0.to - email del destinatario
 * @param {string} param0.pin - código PIN
 * @param {string} param0.documentId - id del documento
 */
export async function sendPinEmail({ to, pin, documentId }) {
  try {
    // Si no configuraste SMTP_USER, estamos en modo DEV
    if (!process.env.SMTP_USER) {
      console.log(`DEV EMAIL -> to: ${to} | PIN: ${pin} | documentId: ${documentId}`);
      return;
    }

    const info = await transporter.sendMail({
      from: '"Tu Empresa" <no-reply@example.com>',
      to,
      subject: `PIN para firmar documento ${documentId}`,
      text: `Tu código PIN es: ${pin}. Expira en ${process.env.PIN_EXP_MIN || 10} minutos.`
    });

    console.log('Email enviado: ', info.messageId);

  } catch (err) {
    console.error('Error enviando correo', err);
    throw err;
  }
}
