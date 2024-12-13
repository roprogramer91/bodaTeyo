const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "clave-secreta-super-segura"; // Define la clave secreta en tus variables de entorno

// Generar un token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "100h" });
};

// Verificar un token
const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };
