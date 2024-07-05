//Importa el modulo mongoose.
const mongoose = require("mongoose");
//Cargamos las variables de entorno desde el archivo .env
process.loadEnvFile();

//Obtenemos la URI de conexión y el nombre de la base de datos desde las variables de entorno.
const URI = process.env.MONGODB_URLSTRING; //URI de conexión a MongoDB.
const DATABASE_NAME = process.env.DATABASE_NAME; //Nombre de la base de datos.

//Conectar a MongoDB usando Mongoose.
const connectDB = () => {
  return mongoose
    .connect(URI + DATABASE_NAME)
    .then(() => console.log("Conectado a MongoDB"))
    .catch((err) => console.log("Error al conectarse : ", err));
};

//Exportamos el modulo de conexión.
module.exports = connectDB;
