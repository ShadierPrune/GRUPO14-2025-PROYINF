import fs from 'fs/promises';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const STORAGE_DIR = path.join(process.cwd(), 'signed_pdfs');
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

// Crear carpetas si no existen
await fs.mkdir(STORAGE_DIR, { recursive: true }).catch(()=>{});
await fs.mkdir(UPLOADS_DIR, { recursive: true }).catch(()=>{});

/**
 * Genera un PDF firmado, lo guarda y devuelve la ruta.
 * Si el PDF original no existe, crea uno simple.
 * @param {Object} param0
 * @param {string} param0.documentId
 * @param {string} param0.documentHash
 * @param {string} param0.signerId
 * @param {string} param0.signatureId
 * @returns {Object} { path: string }
 */
export async function generateSignedPdf({ documentId, documentHash, signerId, signatureId }) {
  const srcPath = path.join(UPLOADS_DIR, `${documentId}.pdf`);
  const exists = await fs.stat(srcPath).catch(()=>null);

  if (!exists) {
    // Crear PDF simple si no existe
    const doc = await PDFDocument.create();
    const page = doc.addPage([600, 400]);
    page.drawText(`Documento: ${documentId}`, { x: 50, y: 340, size: 14 });
    page.drawText(`Firma generada por: ${signerId}`, { x: 50, y: 320, size: 12 });
    const bytes = await doc.save();
    await fs.writeFile(srcPath, bytes);
  }

  const existingPdfBytes = await fs.readFile(srcPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const firstPage = pdfDoc.getPages()[0];
  const { width, height } = firstPage.getSize();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Agregar texto de firma
  const text = `Firmado por: ${signerId} | signature_id: ${signatureId} | hash: ${documentHash}`;
  firstPage.drawText(text, { x: 50, y: 50, size: 9, font: helvetica, color: rgb(0,0,0) });

  // Agregar caja visual de firma
  firstPage.drawRectangle({
    x: width - 220,
    y: 30,
    width: 160,
    height: 60,
    borderColor: rgb(0.1, 0.1, 0.1),
    borderWidth: 1
  });
  firstPage.drawText('Firma', { x: width - 200, y: 70, size: 12 });

  const signedPdfBytes = await pdfDoc.save();
  const outPath = path.join(STORAGE_DIR, `signed_${documentId}_${signatureId}.pdf`);
  await fs.writeFile(outPath, signedPdfBytes);

  return { path: outPath };
}
