const express = require('express');
const pool = require('./db'); // Tu archivo de conexión existente
const initFinancialDB = require('./initDb'); // La inicialización
const { obtenerScoringPorRut } = require('./scoringService'); // La lógica de negocio
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const port = 3000;

const OCR_SERVICE_URL = process.env.OCR_SERVICE_URL || 'http://ocr-service:4000';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Inicializar Base de Datos al arrancar
initFinancialDB();

//frontend de scoring
app.get('/scoring-check', (req, res) => {
    res.sendFile(path.join(__dirname, 'scoring-frontend', 'index.html'));
});

// API de Scoring 
app.get('/api/scoring/:rut', async (req, res) => {
    try {
        const { rut } = req.params;
        const resultado = await obtenerScoringPorRut(rut);

        if (!resultado) {
            return res.status(404).json({ error: 'RUT no encontrado en el sistema financiero.' });
        }

        res.json(resultado);
    } catch (err) {
        console.error('Error en API scoring:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.get('/', (req, res) => {
    res.send(`
      <h1>Backend Bancario</h1>
      <ul>
          <li><a href="/scoring-check">Ir al Evaluador de Crédito</a></li>
          <li><a href="/ocr">Ir al servicio OCR</a></li>
      </ul>
    `);
});

app.get('/ocr', (req, res) => {
    res.sendFile(path.join(__dirname, 'ocr-service', 'formulario.html'));
});

app.post('/upload', upload.single('imagenCedula'), async (req, res) => {
    console.log('Procesando upload OCR...');
    if (!req.file) return res.status(400).send('No se ha subido archivo.');

    try {
        const form = new FormData();
        form.append('imagenCedula', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        const response = await axios.post(`${OCR_SERVICE_URL}/process`, form, {
            headers: { ...form.getHeaders() }
        });

        res.status(200).json({ 
          mensaje: 'Procesado por OCR',
          resultado: response.data.resultado
        });
    } catch (error) {
        console.error('Error OCR:', error.message);
        res.status(500).json({ error: 'Error comunicando con servicio OCR' });
    }
});

app.get('/messages', async (req, res) => {
    try {
      await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, content TEXT)');
      const result = await pool.query('SELECT * FROM messages');
      res.json(result.rows);
    } catch (err) { res.status(500).send('Error DB'); }
});

app.listen(port, () => {
    console.log(`App corriendo en http://localhost:${port}`);
});
