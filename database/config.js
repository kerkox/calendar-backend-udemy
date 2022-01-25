const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    console.log("process.env.DB_CONECTION", process.env.DB_CONECTION);
    const connection = process.env.DB_CONECTION || "";
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