const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require("cors");
const invitacionRoutes = require('./Routes/invitacionRoutes');
const panelRoutes = require ('./Routes/panelRoutes');

const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Rutas
app.use('/api/invitaciones', invitacionRoutes); 
app.use('/api/panel', panelRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
