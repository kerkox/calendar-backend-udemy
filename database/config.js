const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.DB_CONECTION)

    console.log('DB Online');
  } catch (error) {
    console.error(error);
    throw new Error('Error a la hora de inicialiazar BD');
  }
}

module.exports = {
  dbConnection
}