const pool = require('./db');

// Funcion privada (no se exporta) con la formula matemática
function calcularFormula(datos) {
    let score = 300; // Base
    let explicacion = [];

    //Regla de Morosidad
    if (datos.morosidad) {
        return { score: 0, estado: 'RECHAZADO', detalles: ['Cliente con morosidad vigente (Bloqueo automático).'] };
    }

    //Capacidad de Pago (+5 pts por cada 10.000 libres)
    const ingresoDisponible = datos.ingreso_mensual - datos.deuda_total;
    const puntosFinancieros = Math.floor(ingresoDisponible / 10000) * 5;
    score += puntosFinancieros;
    explicacion.push(`Capacidad de pago: +${puntosFinancieros} pts`);

    // Estabilidad (+10 pts por mes trabajado)
    const puntosAntiguedad = datos.antiguedad_laboral * 10;
    score += puntosAntiguedad;
    explicacion.push(`Antigüedad laboral: +${puntosAntiguedad} pts`);

    // Normalizar (0 a 1000)
    score = Math.max(0, Math.min(1000, score));
    const estado = score >= 650 ? 'APROBADO' : 'RECHAZADO';

    return { score, estado, detalles: explicacion };
}

// Funcion publica que usara el index.js
const obtenerScoringPorRut = async (rut) => {
    //buscar en BD
    const result = await pool.query('SELECT * FROM financial_data WHERE rut = $1', [rut]);
    
    if (result.rows.length === 0) {
        return null; //no existe
    }

    const datosUsuario = result.rows[0];

    //Calcular Riesgo
    const analisis = calcularFormula(datosUsuario);

    // Retornar objeto completo
    return {
        cliente: {
            rut: datosUsuario.rut,
            nombre: datosUsuario.nombre,
            ingreso: datosUsuario.ingreso_mensual,
            deuda: datosUsuario.deuda_total,
            antiguedad: datosUsuario.antiguedad_laboral,
            morosidad: datosUsuario.morosidad
        },
        analisis: analisis
    };
};

module.exports = { obtenerScoringPorRut };
