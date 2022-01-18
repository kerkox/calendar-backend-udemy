const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();


// Crear el servidor de express

const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
app.use(express.static('public'));

// lectura y parseo del body
app.use(express.json())


// Rutas
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos


//escuchar peticiones
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Corriendo en el puerto: ${PORT}`)
})