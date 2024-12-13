const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const PanelController = require("../Controllers/panelController");

// Rutas sin middleware de autenticación
router.post("/registrar", PanelController.registrarUsuario);
router.post("/login", PanelController.login);

// Rutas con middleware de autenticación
router.get("/invitados", authMiddleware, PanelController.getListaInvitados);
router.get("/invitados/confirmados", authMiddleware, PanelController.getNumeroInvitados);

module.exports = router;
