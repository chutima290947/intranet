import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function exportFullSchema() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    let sqlOutput = `-- ====================================================\n`;
    sqlOutput += `-- DATABASE SCHEMA EXPORT (Neon PostgreSQL)\n`;
    sqlOutput += `-- Exported at: ${new Date().toISOString()}\n`;
    sqlOutput += `-- ====================================================\n\n`;

    sqlOutput += `-- 1. CREATE DATABASE\n`;
    sqlOutput += `CREATE DATABASE neondb;\n\n`;
    sqlOutput += `\\connect neondb;\n\n`;

    // Extensions
    const extRes = await pool.query(`SELECT extname FROM pg_extension WHERE extname != 'plpgsql';`);
    if (extRes.rows.length > 0) {
      sqlOutput += `-- 2. EXTENSIONS\n`;
      for (const row of extRes.rows) {
        sqlOutput += `CREATE EXTENSION IF NOT EXISTS "${row.extname}";\n`;
      }
      sqlOutput += `\n`;
    }

    // Custom Types / Enums
    const enumRes = await pool.query(`
      SELECT t.typname, e.enumlabel
      FROM pg_type t
      JOIN pg_enum e ON t.oid = e.enumtypid
      JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      WHERE n.nspname = 'public'
      ORDER BY t.typname, e.enumsortorder;
    `);
    if (enumRes.rows.length > 0) {
      sqlOutput += `-- 3. ENUMS / TYPES\n`;
      const enums = {};
      enumRes.rows.forEach(r => {
        if (!enums[r.typname]) enums[r.typname] = [];
        enums[r.typname].push(`'${r.enumlabel}'`);
      });
      for (const [name, values] of Object.entries(enums)) {
        sqlOutput += `CREATE TYPE ${name} AS ENUM (${values.join(', ')});\n`;
      }
      sqlOutput += `\n`;
    }

    // Sequences
    const seqRes = await pool.query(`
      SELECT sequence_name 
      FROM information_schema.sequences 
      WHERE sequence_schema = 'public';
    `);
    if (seqRes.rows.length > 0) {
      sqlOutput += `-- 4. SEQUENCES\n`;
      for (const row of seqRes.rows) {
        sqlOutput += `CREATE SEQUENCE IF NOT EXISTS ${row.sequence_name};\n`;
      }
      sqlOutput += `\n`;
    }

    // Tables
    const tablesRes = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    sqlOutput += `-- 5. TABLES\n\n`;

    for (const tableRow of tablesRes.rows) {
      const tableName = tableRow.table_name;
      
      const colRes = await pool.query(`
        SELECT 
          column_name, 
          data_type, 
          udt_name,
          character_maximum_length, 
          is_nullable, 
          column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
        ORDER BY ordinal_position;
      `, [tableName]);

      sqlOutput += `CREATE TABLE "${tableName}" (\n`;
      const colDefs = [];

      for (const col of colRes.rows) {
        let typeStr = col.data_type.toUpperCase();
        if (col.data_type === 'USER-DEFINED') {
          typeStr = col.udt_name;
        } else if (col.character_maximum_length) {
          typeStr += `(${col.character_maximum_length})`;
        } else if (col.data_type === 'ARRAY') {
          typeStr = `${col.udt_name.replace(/^_/, '')}[]`;
        }

        let def = `    "${col.column_name}" ${typeStr}`;
        if (col.is_nullable === 'NO') {
          def += ' NOT NULL';
        }
        if (col.column_default !== null) {
          def += ` DEFAULT ${col.column_default}`;
        }
        colDefs.push(def);
      }

      // Primary Key
      const pkRes = await pool.query(`
        SELECT kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'PRIMARY KEY'
          AND tc.table_schema = 'public'
          AND tc.table_name = $1
        ORDER BY kcu.ordinal_position;
      `, [tableName]);

      if (pkRes.rows.length > 0) {
        const pkCols = pkRes.rows.map(r => `"${r.column_name}"`).join(', ');
        colDefs.push(`    PRIMARY KEY (${pkCols})`);
      }

      sqlOutput += colDefs.join(',\n');
      sqlOutput += `\n);\n\n`;
    }

    // Constraints & Foreign Keys
    const fkRes = await pool.query(`
      SELECT
        tc.table_name,
        tc.constraint_name,
        kcu.column_name,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name,
        rc.update_rule,
        rc.delete_rule
      FROM information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      JOIN information_schema.referential_constraints AS rc
        ON tc.constraint_name = rc.constraint_name
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public';
    `);

    if (fkRes.rows.length > 0) {
      sqlOutput += `-- 6. FOREIGN KEYS\n`;
      for (const fk of fkRes.rows) {
        sqlOutput += `ALTER TABLE "${fk.table_name}" ADD CONSTRAINT "${fk.constraint_name}" FOREIGN KEY ("${fk.column_name}") REFERENCES "${fk.foreign_table_name}" ("${fk.foreign_column_name}") ON UPDATE ${fk.update_rule} ON DELETE ${fk.delete_rule};\n`;
      }
      sqlOutput += `\n`;
    }

    // Indexes
    const indexRes = await pool.query(`
      SELECT indexdef
      FROM pg_indexes
      WHERE schemaname = 'public'
        AND indexname NOT LIKE '%_pkey';
    `);

    if (indexRes.rows.length > 0) {
      sqlOutput += `-- 7. INDEXES\n`;
      for (const idx of indexRes.rows) {
        sqlOutput += `${idx.indexdef};\n`;
      }
      sqlOutput += `\n`;
    }

    const outputPath = path.join(__dirname, 'schema.sql');
    fs.writeFileSync(outputPath, sqlOutput, 'utf8');
    console.log('SUCCESS: Schema written to ' + outputPath);
  } catch (err) {
    console.error('ERROR:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

exportFullSchema();
