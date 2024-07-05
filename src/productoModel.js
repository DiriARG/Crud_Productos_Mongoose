const mongoose = require("mongoose");

//Definimos el esquema y el modelo de Mongoose.
const productoSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  importe: Number,
  categoria: String,
});

const Producto = mongoose.model("Producto", productoSchema);

//Exportamos el modelo "Producto".
module.exports = Producto;
