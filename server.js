const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQLJuan',  // Cambia por tu contraseña
  database: 'gestor_encuestas'
});

connection.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

// Rutas
app.use('/api', routes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
