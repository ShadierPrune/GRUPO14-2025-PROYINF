const pool = require('./db');

const initFinancialDB = async () => {
  try {
    console.log('Verificando tablas de base de datos');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS financial_data (
        rut VARCHAR(20) PRIMARY KEY,
        nombre VARCHAR(100),
        ingreso_mensual INTEGER,
        deuda_total INTEGER,
        antiguedad_laboral INTEGER,
        morosidad BOOLEAN
      )
    `);

    const queries = [
      // El ideal
      `INSERT INTO financial_data (rut, nombre, ingreso_mensual, deuda_total, antiguedad_laboral, morosidad) 
       VALUES ('1-1', 'Juan Perfecto', 1500000, 200000, 24, false) ON CONFLICT DO NOTHING`,
      
      // El endeudado
      `INSERT INTO financial_data (rut, nombre, ingreso_mensual, deuda_total, antiguedad_laboral, morosidad) 
       VALUES ('2-2', 'Pedro Deudas', 1200000, 1000000, 6, false) ON CONFLICT DO NOTHING`,
      
      // El moroso
      `INSERT INTO financial_data (rut, nombre, ingreso_mensual, deuda_total, antiguedad_laboral, morosidad) 
       VALUES ('3-3', 'Diego Dicom', 800000, 50000, 12, true) ON CONFLICT DO NOTHING`,
      
      // El junior
      `INSERT INTO financial_data (rut, nombre, ingreso_mensual, deuda_total, antiguedad_laboral, morosidad) 
       VALUES ('4-4', 'Ana Junior', 500000, 0, 3, false) ON CONFLICT DO NOTHING`
    ];

    for (const q of queries) {
      await pool.query(q);
    }

    console.log('Base de datos inicializada correctamente.');
  } catch (err) {
    console.error('Error inicializando DB:', err);
  }
};

module.exports = initFinancialDB;
