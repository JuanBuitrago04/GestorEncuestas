const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configuración de middleware
app.use(bodyParser.json());

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQLJuan',
  database: 'gestor_encuestas'
});

// Conectar a la base de datos
connection.connect(err => {
  if (err) {
    console.error("Error al conectar con MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

// Ruta para login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Buscar usuario en la base de datos
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error en la consulta' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error al verificar la contraseña' });
      }

      if (match) {
        res.json({ success: true, message: 'Login exitoso' });
      } else {
        res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
      }
    });
  });
});

// Ruta para registro
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al cifrar la contraseña' });
    }

    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
      }

      res.json({ success: true, message: 'Usuario registrado con éxito' });
    });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
