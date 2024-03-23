

const { ConnectionPool } = require('mssql');
// SQL Server configuration
var config = {
  "user": "sqlserver", // Database username
  "password": "Diabetes1", // Database password
  "server": "34.173.87.172", // Server IP address
  "database": "Diabetes", // Database name
  "options": {
      "encrypt": false // Disable encryption
  }
}

// Connect to SQL Server
const pool = new ConnectionPool(config);


pool.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

module.exports = pool;