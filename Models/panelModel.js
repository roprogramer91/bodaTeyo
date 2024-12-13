const pool = require("../Config/database"); // Asegúrate de que `pool` esté configurado correctamente en tu archivo de base de datos

module.exports = {
    // Usuarios
    getUserByUsername: async (username) => {
        const query = "SELECT * FROM usuarios WHERE username = ?";
        const [rows] = await pool.query(query, [username]);
        return rows[0]; // Retorna el usuario si existe
    },

    createUser: async (username, password) => {
        const query = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
        await pool.query(query, [username, password]);
    },

    // Invitados
    getAllInvitados: async () => {
        const query = "SELECT * FROM invitados";
        const [rows] = await pool.query(query);
        return rows; // Retorna todos los invitados
    },

    addInvitado: async (nombre, email) => {
        const query = "INSERT INTO invitados (nombre, email) VALUES (?, ?)";
        await pool.query(query, [nombre, email]);
    },

    updateInvitado: async (id, nombre, email) => {
        const query = "UPDATE invitados SET nombre = ?, email = ? WHERE id = ?";
        await pool.query(query, [nombre, email, id]);
    },

    deleteInvitado: async (id) => {
        const query = "DELETE FROM invitados WHERE id = ?";
        await pool.query(query, [id]);
    },

    ContadorInvitados: async () => {
        const query = "SELECT COUNT (*) AS count FROM invitados WHERE attendance = 'Asistira'";
        const [rows] = await pool.query (query);
        return rows[0].count;
    }
};
