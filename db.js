const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,      // Wait for available connection instead of throwing
  connectionLimit: 10,           // Max connections (default is fine for small apps)
  maxIdle: 10,                   // Max idle connections
  idleTimeout: 60000,            // Close idle after 60s
  queueLimit: 0                  // Unlimited queue (0 = no limit)
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL connection error:', err.message || err);
    return;
  }
  console.log('✅ MySQL connected!');
  if (connection) {
    connection.release();
  }
});

module.exports = pool.promise();