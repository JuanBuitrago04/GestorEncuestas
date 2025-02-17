const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQLJuan',  // Cambia por tu contraseña
  database: 'gestor_encuestas'
});

module.exports = connection;
