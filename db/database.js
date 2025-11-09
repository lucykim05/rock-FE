import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on('connect', () => {
  console.log('DB 연결 성공');
});

pool.on('error', (err) => {
  console.error('DB 연결 오류:', err);
});

export default pool;
