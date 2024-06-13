const express = require("express");
const app = express();
const connectDB = require("./src/mongoose.js");
const port = process.env.PORT ?? 3000;
const morgan = require("morgan");
const Producto = require("./src/productoModel.js");

//Conectar a MongoDB usando Mongoose
connectDB();

//Middleware
app.use(express.json());
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
    query = {};
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

//Devuelve un producto por su ID.
app.get("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ message: `Producto con ID:${id} no encontrado` });
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
      new: true,
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
      overwrite: true,
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
    const precioNumerico = parseFloat(importe);
    const productos = await Producto.find({ importe: { $gt: precioNumerico } });
    if (productos.length > 0) {
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

//Devuelve una lista de todas las categorías disponibles. FALTA TERMINAR
app.get("/productos/categorias", async (req, res) => {
  try {
    const lista = await Producto.aggregate([
      { $project: { nombre_categoria: "$categoria", _id: 0 } }
    ]);
    res.json(lista);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la lista" });
  }
});



//Devuelve los productos que coinciden con el nombre especificado (búsqueda parcial).
app.get("/productos/nombre/:nombre", async (req, res) => {
  const { nombre } = req.params;

  try {
    const productos = await Producto.find({
      nombre: { $regex: nombre, $options: "i" },
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
      res
        .status(404)
        .json({
          message: "No se encontraron productos dentro del rango especificado",
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los productos dentro del rango especificado",
      });
  }
});

//Inicializamos el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en: http://localhost:${port}`);
});
