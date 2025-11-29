"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// LÓGICA DE NEGOCIO COPIADA DE SIMULADOR.TSX
function calcularCuotaAPI(monto, plazo, taza) {
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
app.post('/api/v1/simulacion', (req, res) => {
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
//# sourceMappingURL=server.js.map