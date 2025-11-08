const express = require('express');
const pool = require('./db'); // Importar la conexión
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

//Importamos la funcion quickstart pal OCR
const { quickstart } = require('./OCR/ocr.js');
//config de multer para almacenamiento en RAM
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta de prueba que guarda un mensaje en la base de datos
app.get('/save', async (req, res) => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, content TEXT)');
    await pool.query('INSERT INTO messages (content) VALUES ($1)', ['Hola desde PostgreSQL!']);
    res.send('Mensaje guardado en la base de datos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

// Ruta para obtener todos los mensajes
app.get('/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.get('/', (req, res) => {
  res.send('¡Bienvenido! Usa /save para guardar un mensaje y /messages para verlos.');
});

app.get('/ocr', (req, res) => {
    res.sendFile(path.join(__dirname, 'OCR', 'formulario.html'));
});

//Para manejar la subida del archivo
app.post('/upload', upload.single('imagenCedula'), async (req, res) => {
    console.log('Archivo recibido en memoria.');

    if (!req.file) {
      return res.status(400).send('No se ha subido ningún archivo.');
    }

    try {
        const fileBuffer = req.file.buffer;
        const mimeType = req.file.mimetype;
        const encodedImage = fileBuffer.toString('base64');
        
        //Llamamos la funcion del OCR
        const datosExtraidos = await quickstart(encodedImage, mimeType);
        res.status(200).json({ 
          mensaje: 'Imagen procesada correctamente',
          resultado: datosExtraidos
        });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo procesar la imagen en el servidor.' });
    }
});


app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`);
});
