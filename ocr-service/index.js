const express = require('express');
const multer = require('multer');
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;

const app = express();
const port = 4000;

// Configuración de Multer (Memoria)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configuración de Google Cloud (desde variables de entorno o defaults)
const projectId = process.env.GOOGLE_PROJECT_ID || 'project-5f5d1b7e-3a3e-476a-ba3';
const location = process.env.GOOGLE_LOCATION || 'us';
const processorId = process.env.GOOGLE_PROCESSOR_ID || '34420d66c4a344dc';

const client = new DocumentProcessorServiceClient();

async function procesarImagen(encodedImage, mimeType) {
  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;
  
  const request = {
    name,
    rawDocument: {
      content: encodedImage,
      mimeType: mimeType,
    },
  };

  const [result] = await client.processDocument(request);
  const { document } = result;
  
  const datosExtraidos = {};
  
  if (document.entities) {
      for (const entity of document.entities) {
        const tipo = entity.type;
        const texto = entity.mentionText;
        datosExtraidos[tipo] = texto.replace(/\n/g, ' ').trim();
      }
  }
  return datosExtraidos;
}

// Endpoint interno para procesar
app.post('/process', upload.single('imagenCedula'), async (req, res) => {
    try {
        console.log('Procesando solicitud de OCR...');
        if (!req.file) {
            return res.status(400).json({ error: 'No se recibió ninguna imagen.' });
        }

        const fileBuffer = req.file.buffer;
        const mimeType = req.file.mimetype;
        const encodedImage = fileBuffer.toString('base64');

        const resultado = await procesarImagen(encodedImage, mimeType);
        
        console.log('OCR completado con éxito.');
        res.json({ resultado });

    } catch (error) {
        console.error('Error en el servicio de OCR:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servicio OCR corriendo en http://localhost:${port}`);
});
