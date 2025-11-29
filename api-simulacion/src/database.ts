// src/database.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Aquí configuramos la conexión
export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'banco_db',
  password: process.env.DB_PASSWORD || 'tu_contraseña',
  port: Number(process.env.DB_PORT) || 5432,
});

// Probamos la conexión al iniciar
pool.connect()
  .then(() => console.log('Conexión exitosa a PostgreSQL'))
  .catch(err => console.error('jh Error conectando a PostgreSQL', err));