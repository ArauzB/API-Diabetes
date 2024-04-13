

const { ConnectionPool } = require('mssql');
// SQL Server configuration
var config = {
  "user": "sa", // Database username
  "password": "Arauz1234", // Database password
  "server": "100.64.196.59", // Server IP address
  "database": "Diabetes", // Database name
  "options": {
      "encrypt": false, // Disable encryption
      "trustServerCertificate": true
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