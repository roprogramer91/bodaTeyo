const express = require('express');
const router = express.Router();
const invitacionController = require('../Controllers/invitacionController');

// Ruta para recibir el formulario de confirmación de asistencia
router.post('/confirmar', invitacionController.confirmarAsistencia);

module.exports = router;
