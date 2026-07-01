const { Pool } = require('pg');
const logger = require('../utils/logger');
 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
 
pool.on('error', (err) => {
  logger.error(`Unexpected PostgreSQL error: ${err.message}`);
});
 
pool.on('connect', () => {
  logger.info('New client connected to PostgreSQL pool');
});
 
module.exports = pool;
 