//Importación modulo Express JS.
const express = require("express");
//Creamos una instancia de la aplicación Express.
const app = express();
//Importamos la función para conectar a la base de datos MongoDB.
const connectDB = require("./src/mongoose.js");
//Definimos el puerto, predeterminadamente el que se encuentra en el archivo .env, caso contrario el 3008.
const port = process.env.PORT ?? 3008;
//Importamos el módulo morgan para el registro de solicitudes HTTP.
const morgan = require("morgan");
//Importamos el modelo de producto.
const Producto = require("./src/productoModel.js");

//Conectar a MongoDB usando Mongoose.
connectDB();

//Middleware que sirve para reconocer el objeto de solicitud entrante como un objeto JSON (para POST y PUT).
app.use(express.json());
//Middleware que sirve para tener un registro detallado de las solicitudes HTTP en una aplicación Express.js.
app.use(morgan("dev"));

//Ruta principal (Devuelve un mensaje de bienvenida a la API).
app.get("/", (req, res) => {
  res.json("Bienvenido a la API de Productos tecnologicos");
});

//Devuelve todos los productos. Permite filtrar por categoría mediante querey string.
app.get("/productos", async (req, res) => {
  const { categoria } = req.query;
  let query;
  if (!categoria) {
    //Si no encuentra categoria en la url...
    query = {}; //Muestra todo...
  } else {
    query = { categoria: { $regex: categoria, $options: "i" } };
  }
  try {
    const productos = await Producto.find(query);
    res.json(productos);
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});

//Devuelve una lista de todas las categorías disponibles. 
app.get("/productos/categorias", async (req, res) => {
  try {
    //Obtenemos todos los productos desde la BD.
    const productos = await Producto.find();
    //Extrae las categorías de los productos.
    const categorias = productos.map((producto) => producto.categoria);
    //Obtenemos las categorías únicas usando un Set.
    const categoriasUnicas = [...new Set(categorias)];
    res.json(categoriasUnicas);
  } catch (error) {
    console.error("Error al obtener las categorias: ", error);
    res.status(500).send("Error al obtener las categorias");
  }
});

//Devuelve un producto por su ID.
app.get("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ message: `Producto con ID:${id} no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar un producto por su ID" });
  }
});

//Crear un nuevo producto.
app.post("/productos", async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  try {
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear un nuevo producto" });
  }
});

//Eliminar un producto por su ID.
app.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const eliminar = await Producto.findByIdAndDelete(id);
    if (eliminar) {
      res.json({ message: "Producto eliminado con exito" });
    } else {
      res.status(404).json({
        message: "Producto no encontrada para borrar",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el producto" });
  }
});

//Actualiza parcialmente un producto por su ID.
app.patch("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, {
      new: true, //Devuelve el documento actualizado en lugar del original.
    });
    if (productoActualizado) {
      res.json({
        message: `Producto actualizado parcialmente con exito:`,
        productoActualizado,
      });
    } else {
      return res.status(404).json({
        message: "Producto no encontrada para su actualización parcial",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar parcialmente un producto" });
  }
});

//Actualiza completamente un producto por su ID.
app.put("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true, //Se agrega overwrite para sobreescribir el documento con los datos proporcionados.
    });
    if (productoActualizado) {
      res.json({
        message: `Producto actualizado con exito:`,
        productoActualizado,
      });
    } else {
      return res.status(404).json({
        message: "Producto no encontrada para su actualización",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar un producto" });
  }
});

//Devuelve los productos con un importe mayor al especificado.
app.get("/productos/importes/mayor/:importe", async (req, res) => {
  const { importe } = req.params;

  try {
    // Convertir el precio (Array/String) a float por si el usuario digita un número con coma. Siempre lo que ingrese el usuario va a ser un string, por eso se lo parsea en este caso.
    const precioNumerico = parseFloat(importe);
    const productos = await Producto.find({ importe: { $gt: precioNumerico } });
    if (productos.length > 0) {
      //Se coloca .lenght mayor a 0 para que compruebe si el array tiene mas de un elemento y pase a ejecutarse la condición else en caso de que no se encuentre un producto con un precio mayor al definido.
      res.json(productos);
    } else {
      res.status(404).json({
        message: "No se encontro un producto con un precio mayor al indicado ",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
});

//Devuelve los productos con un importe menor al especificado.
app.get("/productos/importes/menor/:importe", async (req, res) => {
  const { importe } = req.params;

  try {
    const precioNumerico = parseFloat(importe);
    const productos = await Producto.find({ importe: { $lt: precioNumerico } });
    if (productos.length > 0) {
      res.json(productos);
    } else {
      res.status(404).json({
        message: "No se encontro un producto con un precio menor al indicado ",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
});

//Devuelve los productos que coinciden con el nombre especificado (búsqueda parcial).
app.get("/productos/nombre/:nombre", async (req, res) => {
  const { nombre } = req.params;

  try {
    const productos = await Producto.find({
      nombre: { $regex: nombre, $options: "i" }, //Crea una expresión regular con el nombre del producto y el modificador "i" para que la búsqueda sea insensible a mayúsculas y minúsculas.
    });
    if (productos) {
      res.json(productos);
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron los productos especificados" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos con el nombre especificado",
    });
  }
});

//Devuelve los productos cuyo importe esté dentro del rango especificado.
app.get("/productos/rango/:min/:max", async (req, res) => {
  const { min, max } = req.params;
  try {
    const rangoEspecificado = await Producto.find({
      importe: { $gte: min, $lte: max },
    });
    if (rangoEspecificado) {
      res.json(rangoEspecificado);
    } else {
      res.status(404).json({
        message: "No se encontraron productos dentro del rango especificado",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos dentro del rango especificado",
    });
  }
});

//Inicializamos el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en: http://localhost:${port}`);
});
