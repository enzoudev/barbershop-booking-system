import { Pool } from 'pg';

const globalForPool = global as unknown as { pool: Pool };

export const pool = globalForPool.pool || new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Permite a conexão segura sem precisar de certificados locais
  }
});

if (process.env.NODE_ENV !== 'production') globalForPool.pool = pool;