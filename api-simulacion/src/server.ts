import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { pool } from './database'; 

const app = express();
const PORT = 3000; 

app.use(cors());
app.use(express.json());

// LÓGICA DE NEGOCIO 
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

// ENDPOINT DE LA API (modificado para ser ASYNC y guardar en DB)
app.post('/api/v1/simulacion', async (req: Request, res: Response) => {
    const { monto, plazo, taza } = req.body;

    if (typeof monto !== 'number' || typeof plazo !== 'number' || typeof taza !== 'number') {
         return res.status(400).json({ error: 'Monto, plazo y taza deben ser números.' });
    }

    const resultados = calcularCuotaAPI(monto, plazo, taza);

    const id_simulacion = `SIM-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const fechaActual = new Date();

    try {
        // Guardamos en PostgreSQL en una tabla llamada 'simulaciones'
        const query = `
            INSERT INTO simulaciones (id_simulacion, monto, plazo, tasa, cuota_mensual, total_pagado, fecha_creacion)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        
        const values = [
            id_simulacion, 
            monto, 
            plazo, 
            taza, 
            resultados.cuota_mensual, 
            resultados.total_pagado, 
            fechaActual
        ];

        await pool.query(query, values);

        res.json({
            mensaje: "Simulación guardada con éxito",
            id_simulacion,
            ...resultados
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`[API Simulación] Corriendo en puerto interno ${PORT}`);
});