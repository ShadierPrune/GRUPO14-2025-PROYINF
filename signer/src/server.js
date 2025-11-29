import app from './app.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import pool from './db.js';

dotenv.config();
const PORT = process.env.SIGNER_PORT || 4000;

async function ensureMigrations() {
  // Ejecutar migración simple (leer archivo SQL y ejecutarlo)
  try {
    const sql = fs.readFileSync(path.join(process.cwd(), 'migrations', '001_create_signatures.sql'), 'utf8');
    await pool.query(sql);
    console.log('Migrations applied');
  } catch (err) {
    console.error('Error applying migrations', err);
  }
}

await ensureMigrations();

app.listen(PORT, () => {
  console.log(`Signer API corriendo en puerto ${PORT}`);
});
