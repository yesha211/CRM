const mysql = require('mysql2/promise');

const connectDatabase = () => {
  // Create a MySQL connection pool
  const pool = mysql.createPool({
    connectionLimit: 10, 
    host: '103.76.231.167', 
    user: 'miraaik1_navigator_crm', 
    password: 'u8*y^w-E_R0H', 
    database: 'miraaik1_navigator_crm' ,
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
