const { verifyToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Acceso no autorizado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Almacena la información del usuario en la solicitud
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};
