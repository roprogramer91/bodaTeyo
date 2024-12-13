const bcrypt = require("bcryptjs");
const PanelModel = require("../Models/panelModel");
const { generateToken } = require("../utils/jwt");

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            // Verifica si el usuario existe
            const user = await PanelModel.getUserByUsername(username);
            if (!user) {
                return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
            }

            // Compara la contraseña
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
            }

            // Genera el token
            const token = generateToken(user);

            res.status(200).json({ message: "Login exitoso", token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al iniciar sesión" });
        }
    },

    registrarUsuario: async (req, res) => {
        const { username, password } = req.body;

        try {
            // Encripta la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Guarda el usuario en la base de datos
            await PanelModel.createUser(username, hashedPassword);

            res.status(201).json({ message: "Usuario registrado exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al registrar usuario" });
        }
    },

    getListaInvitados: async (req, res) => {
        try {
            const invitados = await PanelModel.getAllInvitados();
            res.status(200).json(invitados);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener la lista de invitados" });
        }
    },

    getNumeroInvitados: async (req,res) => {
        try {
            const count = await PanelModel.ContadorInvitados();
            res.status(200).json({ invitadosConfirmados: count });
        } catch (error) {
            console.error (error);
            res.status(500).json ({ error: "Error al obtener el conteo de invitados confirmados"});
        }
    },

    agregarInvitado: async (req, res) => {
        try {
            const { nombre, email } = req.body;
            await PanelModel.addInvitado(nombre, email);
            res.status(201).json({ message: "Invitado agregado exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al agregar invitado" });
        }
    },

    modificarInvitado: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, email } = req.body;
            await PanelModel.updateInvitado(id, nombre, email);
            res.status(200).json({ message: "Invitado actualizado exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al modificar invitado" });
        }
    },

    eliminarInvitado: async (req, res) => {
        try {
            const { id } = req.params;
            await PanelModel.deleteInvitado(id);
            res.status(200).json({ message: "Invitado eliminado exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al eliminar invitado" });
        }
    },
};
