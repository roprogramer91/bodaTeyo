const invitacionModel = require('../Models/invitacionModel'); // Importar el modelo

// Función para manejar la confirmación de asistencia
exports.confirmarAsistencia = async (req, res) => {
  const { attendance, firstName, lastName, guess } = req.body;

  if (!attendance || !firstName || !lastName || !guess) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    // Llamar al modelo para insertar la confirmación
    const [result] = await invitacionModel.confirmarAsistencia(attendance, firstName, lastName, guess);
    
    // Responder con éxito si la inserción fue exitosa
    res.status(200).json({ message: 'Confirmación enviada con éxito.', result });
  } catch (err) {
    // Si ocurre un error, responder con el mensaje de error
    console.error('Error al procesar la solicitud:', err);
    res.status(500).json({ message: 'Error al procesar la solicitud.', error: err.message });
  }
};
