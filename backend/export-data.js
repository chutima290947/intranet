import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

function escapeSqlValue(val) {
  if (val === null || val === undefined) return 'NULL';
  if (Buffer.isBuffer(val)) {
    return `'\\x${val.toString('hex')}'::bytea`;
  }
  if (typeof val === 'boolean') {
    return val ? 'TRUE' : 'FALSE';
  }
  if (typeof val === 'number') {
    return val.toString();
  }
  if (val instanceof Date) {
    return `'${val.toISOString()}'::timestamptz`;
  }
  if (typeof val === 'object') {
    return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
  }
  return `'${String(val).replace(/'/g, "''")}'`;
}

async function exportFullData() {
  const directConnStr = process.env.DATABASE_URL.replace('-pooler', '');

  const pool = new Pool({
    connectionString: directConnStr,
    ssl: { rejectUnauthorized: false },
    statement_timeout: 60000,
    connectionTimeoutMillis: 30000,
    keepAlive: true,
  });

  const outputPath = path.join(__dirname, 'data.sql');
  const outStream = fs.createWriteStream(outputPath, { encoding: 'utf8' });

  outStream.write(`-- ====================================================\n`);
  outStream.write(`-- DATABASE DATA EXPORT (Neon PostgreSQL)\n`);
  outStream.write(`-- Exported at: ${new Date().toISOString()}\n`);
  outStream.write(`-- ====================================================\n\n`);

  try {
    const tables = ['roles', 'permissions', 'role_permissions', 'admin_users', 'content_store'];

    for (const table of tables) {
      console.log(`Exporting table: ${table}...`);
      outStream.write(`-- Data for Table: "${table}"\n`);
      const rowsRes = await pool.query(`SELECT * FROM "${table}";`);
      if (rowsRes.rows.length === 0) {
        outStream.write(`-- (No rows)\n\n`);
        continue;
      }
      for (const row of rowsRes.rows) {
        const cols = Object.keys(row);
        const colNames = cols.map(c => `"${c}"`).join(', ');
        const vals = cols.map(c => escapeSqlValue(row[c])).join(', ');
        outStream.write(`INSERT INTO "${table}" (${colNames}) VALUES (${vals});\n`);
      }
      outStream.write(`\n`);
    }

    console.log(`Exporting table: uploads...`);
    outStream.write(`-- Data for Table: "uploads"\n`);
    const idRes = await pool.query(`SELECT id FROM "uploads" ORDER BY id;`);
    const total = idRes.rows.length;
    console.log(`Total uploads rows: ${total}`);

    for (let i = 0; i < total; i++) {
      const rowId = idRes.rows[i].id;
      let retries = 3;
      let success = false;
      while (retries > 0 && !success) {
        try {
          const uRes = await pool.query(`SELECT * FROM "uploads" WHERE id = $1;`, [rowId]);
          const row = uRes.rows[0];
          const cols = Object.keys(row);
          const colNames = cols.map(c => `"${c}"`).join(', ');
          const vals = cols.map(c => escapeSqlValue(row[c])).join(', ');
          outStream.write(`INSERT INTO "uploads" (${colNames}) VALUES (${vals});\n`);
          success = true;
        } catch (e) {
          retries--;
          console.warn(`Retry row ${rowId} (remaining: ${retries}): ${e.message}`);
          await new Promise(r => setTimeout(r, 1000));
        }
      }
      if (!success) {
        console.error(`Failed to export uploads row id: ${rowId}`);
      }
      if ((i + 1) % 10 === 0 || i === total - 1) {
        console.log(`Processed ${i + 1}/${total} uploads`);
      }
    }
    outStream.write(`\n`);

    outStream.write(`-- Update sequences\n`);
    const seqTables = [
      { seq: 'roles_id_seq', table: 'roles', col: 'id' },
      { seq: 'permissions_id_seq', table: 'permissions', col: 'id' },
      { seq: 'admin_users_id_seq', table: 'admin_users', col: 'id' },
      { seq: 'uploads_id_seq', table: 'uploads', col: 'id' },
    ];

    for (const s of seqTables) {
      outStream.write(`SELECT setval('${s.seq}', COALESCE((SELECT MAX("${s.col}") FROM "${s.table}"), 1));\n`);
    }

    await new Promise(resolve => outStream.end(resolve));
    console.log('ALL DONE! Schema & data export finished.');
  } catch (err) {
    console.error('ERROR:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

exportFullData();
