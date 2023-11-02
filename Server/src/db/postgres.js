require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES,
  ssl: true,
});
pool.on('error', (error) => {
  console.error('Error in PostgreSQL pool', error);
});

module.exports = pool;
