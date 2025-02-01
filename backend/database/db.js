const mysql = require('mysql2/promise');

const connectDatabase = () => {
  // Create a MySQL connection pool
  const pool = mysql.createPool({
    connectionLimit: 10, 
    host:  process.env.host,
    user: process.env.user,
    password:  process.env.password,
    database: process.env.database,
    port: 3306
  });

  // Attempt to connect to the MySQL server
  pool.getConnection()
    .then(connection => {
      console.log('Connected to MySQL database');
      connection.release(); // Release the connection back to the pool
    })
    .catch(error => {
      console.error('Error connecting to MySQL:', error.message);
    });

  // Handle MySQL connection errors
  pool.on('error', (error) => {
    console.error('MySQL pool connection error:', error.message);
  });

  // Return the pool object
  return pool;
  
};

module.exports = { connectDatabase };
