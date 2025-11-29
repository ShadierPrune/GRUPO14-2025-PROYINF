import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'contra',
  database: process.env.DB_NAME || 'mydb',
  port: process.env.DB_PORT || 5432
});

export default pool;
