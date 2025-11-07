import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000; 

app.use(cors());
app.use(express.json());

// LÓGICA DE NEGOCIO COPIADA DE SIMULADOR.TSX
function calcularCuotaAPI(monto: number, plazo: number, taza: number) {
    const tasaInteresEfectiva = taza / 100;

    const cuota = tasaInteresEfectiva > 0
        ? (monto * (tasaInteresEfectiva * Math.pow(1 + tasaInteresEfectiva, plazo))) / 
          (Math.pow(1 + tasaInteresEfectiva, plazo) - 1)
        : monto / plazo;

    const totalPagado = cuota * plazo;
    const intereses = totalPagado - monto;

    return {
        cuota_mensual: Math.round(cuota),
        total_pagado: Math.round(totalPagado),
        intereses_totales: Math.round(intereses)
    };
}

// ENDPOINT DE LA API
app.post('/api/v1/simulacion', (req: Request, res: Response) => {
    const { monto, plazo, taza } = req.body;

    if (typeof monto !== 'number' || typeof plazo !== 'number' || typeof taza !== 'number') {
         return res.status(400).json({ error: 'Monto, plazo y taza deben ser números.' });
    }

    const resultados = calcularCuotaAPI(monto, plazo, taza);

    const id_simulacion = `SIM-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    res.json({
        id_simulacion, // Genera un ID para que el frontend lo use en la Solicitud
        ...resultados
    });
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`[API Simulación] Corriendo en puerto interno ${PORT}`);
});