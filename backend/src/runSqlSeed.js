/**
 * Executes database/seed_mikiela.sql against the configured MySQL database.
 * Usage: node src/runSqlSeed.js
 */
require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
});
const fs = require('fs');
const path = require('path');
const sequelize = require('./config/database');

const run = async () => {
  const file = path.resolve(__dirname, '../../database/seed_mikiela.sql');
  const sql = fs.readFileSync(file, 'utf8');

  // Split on ";" at end of line, drop pure comment blocks
  const statements = sql
    .split(/;\s*(?:\r?\n|$)/)
    .map((s) => s.replace(/^\s*(?:--[^\n]*\n\s*)+/, '').trim())
    .filter((s) => s.length > 0 && !s.startsWith('--'));

  try {
    await sequelize.authenticate();
    let i = 0;
    for (const statement of statements) {
      await sequelize.query(statement);
      i++;
    }
    console.log(`✔ ${i} statements executed from seed_mikiela.sql`);
    process.exit(0);
  } catch (err) {
    console.error('✖ SQL seed failed:', err.message);
    process.exit(1);
  }
};

run();