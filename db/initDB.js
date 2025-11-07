import pool from './database.js';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'UTF-8');
await pool.query(schema);
console.log('Schema 적용 완료');
