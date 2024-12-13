const db = require('../Config/database'); // Conexión a la base de datos

// Función para insertar una nueva confirmación de asistencia
const confirmarAsistencia = (attendance, firstName, lastName, guess) => {
  const query = 'INSERT INTO invitados (attendance, firstName, lastName, guess) VALUES (?, ?, ?, ?)';

  // Retorna la promesa que resolverá la consulta
  return db.query(query, [attendance, firstName, lastName, guess]);
};

module.exports = {
  confirmarAsistencia
};
