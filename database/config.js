const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    console.log("process.env.DB_CONNECTION", process.env.DB_CONNECTION);
    const connection = process.env.DB_CONNECTION || "";
    if(connection == "") {
      console.log("CADENA DE CONEXION FALTANTE....");
    }
    await mongoose.connect(connection)

    console.log('DB Online');
  } catch (error) {
    console.error(error);
    throw new Error('Error a la hora de inicialiazar BD');
  }
}

module.exports = {
  dbConnection
}