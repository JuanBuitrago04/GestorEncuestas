const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./models");

exports.register = (req, res) => {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) return res.status(400).json({ message: "Todos los campos son obligatorios" });
    const hash = bcrypt.hashSync(password, 10);

    db.query("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)", [nombre, email, hash], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Usuario registrado con éxito" });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(401).json({ message: "Usuario no encontrado" });

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, "secreto", { expiresIn: "1h" });
        res.json({ token });
    });
};

exports.getEncuestas = (req, res) => {
    db.query("SELECT * FROM encuestas", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.responderEncuesta = (req, res) => {
    const { usuario_id, encuesta_id, respuesta } = req.body;
    if (!usuario_id || !encuesta_id || !respuesta) return res.status(400).json({ message: "Todos los campos son obligatorios" });
    
    db.query("INSERT INTO respuestas (usuario_id, encuesta_id, respuesta) VALUES (?, ?, ?)", [usuario_id, encuesta_id, respuesta], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Respuesta guardada con éxito" });
    });
};
