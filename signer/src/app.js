import express from 'express';
import cors from 'cors';
import signRoutes from './routes/sign.routes.js';

const app = express();

// CORS permitido para frontend y API
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'], credentials: true }));

// JSON body parser
app.use(express.json());

// Montar rutas de firma
app.use('/api/sign', signRoutes);

// Ruta de prueba
app.get('/', (req, res) => res.json({ ok: true, service: 'signer' }));

export default app;

