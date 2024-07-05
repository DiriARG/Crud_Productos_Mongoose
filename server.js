//Importación modulo Express JS.
const express = require("express");
//Creamos una instancia de la aplicación Express.
const app = express();
//Importamos la función para conectarse a la base de datos MongoDB.
const connectDB = require("./src/mongoose.js");
//Definimos el puerto, predeterminadamente el que se encuentra en el archivo .env, caso contrario el 3008.
const port = process.env.PORT ?? 3008;
//Importamos el módulo morgan para el registro de solicitudes HTTP.
const morgan = require("morgan");
//Importamos el modelo de producto.
const Producto = require("./src/productoModel.js");

//Conectar a MongoDB usando Mongoose.
connectDB();

//Desactivar el encabezado X-Powered-By por razones de seguridad.
app.disable("x-powered-by");

//Middleware que sirve para reconocer el objeto de solicitud entrante como un objeto JSON (para POST y PUT).
app.use(express.json());
//Middleware que sirve para tener un registro detallado de las solicitudes HTTP en una aplicación Express.js.
app.use(morgan("dev"));

//Ruta principal (Devuelve un mensaje de bienvenida a la API).
app.get("/", (req, res) => {
  res.json("Bienvenido a la API de Productos tecnológicos!🖥️📱");
});

//Devuelve todos los productos. Permite filtrar por categoría mediante query string.
app.get("/productos", async (req, res) => {
  const { categoria } = req.query;
  let query;
  if (!categoria) {
    //Si no encuentra categoría en la url...
    query = {}; //Muestra todo...
  } else {
    query = { categoria: { $regex: categoria, $options: "i" } };
  }
  try {
    const productos = await Producto.find(query);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor 🚫⚙️" });
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
    if (!categoriasUnicas) {
      return res
        .status(404)
        .json({ error: "Lista de categorías no encontrada 🕵️❗" });
    } else {
      res.json(categoriasUnicas);
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor 🚫⚙️" });
  }
});

//Devuelve un producto por su ID.
app.get("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      return res
        .status(404)
        .json({ error: `Producto con ID:${id} no encontrado 🕵️❗ ` });
    } else {
      res.json(producto);
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor 🚫⚙️" });
  }
});

//Crear un nuevo producto.
app.post("/productos", async (req, res) => {
  //Crear una instancia del modelo Producto con los datos recibidos en req.body.
  const nuevoProducto = new Producto(req.body);
  try {
    //Validamos que todos los campos requeridos estén presentes en req.body.
    if (
      !req.body.id ||
      !req.body.nombre ||
      !req.body.importe ||
      !req.body.categoria
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios 🚫!" }); //Si no lo estan devolvemos un error 400.
    } else {
      //Caso contrario si están todos los campos, guardamos el nuevo producto y devolvemos un mensaje con estatus 201.
      await nuevoProducto.save();
      res
        .status(201)
        .json({ message: "Nuevo producto creado ✅: ", nuevoProducto });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor 🚫⚙️" });
  }
});

//Eliminar un producto por su ID.
app.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productoEliminado = await Producto.findByIdAndDelete(id);
    if (!productoEliminado) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado para eliminar 🕵️❗" });
    } else {
      res.json({
        message: "Producto eliminado con éxito ✅: ",
        productoEliminado,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor 🚫⚙️" });
  }
});

//Actualiza parcialmente un producto por su ID.
app.patch("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, {
      new: true, //Devuelve el documento actualizado en lugar del original.
    });
    if (!productoActualizado) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado para su actualización 🕵️❗" });
    } else {
      res.json({
        message: "Producto actualizado con éxito ✅: ",
        productoActualizado,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor 🚫⚙️" });
  }
});

//Actualiza completamente un producto por su ID.
app.put("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true, //Se agrega overwrite para sobrescribir el documento con los datos proporcionados.
    });
    if (!productoActualizado) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado para su actualización 🕵️❗" });
    } else {
      res.json({
        message: "Producto actualizado con éxito ✅: ",
        productoActualizado,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor 🚫⚙️" });
  }
});

//Devuelve los productos con un importe mayor al especificado.
app.get("/productos/importes/mayor/:importe", async (req, res) => {
  const { importe } = req.params;

  try {
    //Convertir el precio (Array/String) a float por si el usuario digita un número con coma. Siempre lo que ingrese el usuario va a ser un string, por eso se lo parsea en este caso.
    const precioNumerico = parseFloat(importe);
    const productos = await Producto.find({ importe: { $gt: precioNumerico } });
    //Se coloca ".lenght mayor a 0" para que compruebe si el array tiene más de un elemento, en este caso, al colocarle "!" estamos negando esa acción.
    if (!productos.length > 0) {
      return res.status(404).json({
        error:
          "No se encontró un producto con un precio mayor al indicado 🕵️❗",
      });
    } else {
      res.json(productos);
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor 🚫⚙️" });
  }
});

//Devuelve los productos con un importe menor al especificado.
app.get("/productos/importes/menor/:importe", async (req, res) => {
  const { importe } = req.params;

  try {
    const precioNumerico = parseFloat(importe);
    const productos = await Producto.find({ importe: { $lt: precioNumerico } });
    if (!productos.length > 0) {
      return res.status(404).json({
        error:
          "No se encontró un producto con un precio menor al indicado 🕵️❗",
      });
    } else {
      res.json(productos);
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor 🚫⚙️" });
  }
});

//Devuelve los productos que coinciden con el nombre especificado (búsqueda parcial).
app.get("/productos/nombre/:nombre", async (req, res) => {
  const { nombre } = req.params;

  try {
    const productos = await Producto.find({
      nombre: { $regex: nombre, $options: "i" }, //Crea una expresión regular con el nombre del producto y el modificador "i" para que la búsqueda sea insensible a mayúsculas y minúsculas.
    });
    //Si no se encuentran los productos...
    if (!productos) {
      return res.status(404).json({
        error: "No se encontraron los productos especificados 🕵️❗",
      });
    } else {
      //Caso contrario se muestran...
      res.json(productos);
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor 🚫⚙️" });
  }
});

//Devuelve los productos cuyo importe esté dentro del rango especificado.
app.get("/productos/rango/:min/:max", async (req, res) => {
  const { min, max } = req.params;
  try {
    //Convertimos min y max a números, ya que req.params devuelve strings.
    const minNum = parseFloat(min);
    const maxNum = parseFloat(max);

    //En la consulta pedimos que sea greather than or equal to $gte (mayor o igual a) y less than or equal to $lte (menor a o igual a) para poder tener un rango de precios.
    const rangoEspecificado = await Producto.find({
      importe: { $gte: minNum, $lte: maxNum },
    });

    //Verificar si no se encontraron productos dentro del rango.
    if (rangoEspecificado.length === 0) {
      return res.status(404).json({
        error: "No se encontraron productos dentro del rango especificado 🕵️❗",
      });
    } else {
      res.json(rangoEspecificado);
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor 🚫⚙️" });
  }
});

//Inicializamos el servidor.
app.listen(port, () => {
  console.log(`Servidor escuchando en: http://localhost:${port}`);
});
