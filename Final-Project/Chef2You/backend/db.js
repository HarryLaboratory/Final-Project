const { Pool } = require('pg');  
const dotenv = require('dotenv');  

dotenv.config();  

// Configure the Pool with additional timeout settings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  
  ssl: {
    rejectUnauthorized: false,  // Configure this according to your environment
  },
  idleTimeoutMillis: 30000,  // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000,  // Fail the connection attempt if it takes longer than 10 seconds
});

// Automatically reconnect on error
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);  // Optionally restart the server if the error is critical
});

// Keep the connection alive 
const keepConnectionAlive = () => {
  setInterval(async () => {
    try {
      await pool.query('SELECT 1');  // Simple query to keep the connection alive
      console.log('Connection to the database is still alive.');
    } catch (err) {
      console.error('Error during keep-alive query:', err);
    }
  }, 60000);  // Run this every minute (adjust as needed)
};

// Start the keep-alive function
keepConnectionAlive();

module.exports = pool;

