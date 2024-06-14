# Actividad: CRUD de productos con Mongoose
En este ejercicio se realiza una API REST utilizando Express JS y Mongoose para gestionar una colección de productos tecnológicos. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) sobre los productos.

## Iniciando el proyecto
- Abrimos la terminal e inicializamos un nuevo proyecto con `npm init -y`.
- Luego instalamos las dependencias necesarias: Express JS (Entorno para desarrollar la API), Mongoose (Biblioteca de modelado de objetos para MongoDB y Node.js) y Morgan (Middleware de registro de solicitudes HTTP); `npm i express mongoose morgan`.

## Configuramos el archivo .env (Environment Variables):
En este caso cambiamos el nombre del archivo llamado `.env copy` a `.env`, luego modificamos su contenido:
- MONGODB_URLSTRING: Copiamos la cadena de conexion desde la pagina de MongoDB o propiamente en el MongoDB Compass.
- PORT: Escribimos el puerto que se va a usar para conectar a la API.
- DATABASE_NAME: Escribimos el nombre de la base de datos en la cual vamos a acceder.
- COLLECTION_NAME: Escribimos el nombre de la collection que nos va a permitir obtener los datos necesarios para nuestra API.

## Rutas de la API REST: 
Dentro del archivo `api.http` se van a encontrar rutas con las siguientes finalidades:
- Ruta principal (Devuelve un mensaje de bienvenida a la API).
- Mostrar todos los productos. También permite filtrar por categoria.
- Mostrar los productos de cierta categoria.
- Mostrar una lista de todas las categorías disponibles.
- Mostrar un producto por su ID.
- Crear un nuevo producto.
- Eliminar un producto por su ID.
- Actualizar parcialmente un producto por su ID.
- Actualizar completamente un producto por su ID.
- Mostrar todos los productos con un importe mayor al especificado.
- Mostrar todos los productos con un importe menor al especificado.
- Mostrar los productos que coinciden con el nombre especificado (búsqueda parcial).
- Mostrar los productos cuyo importe esté dentro del rango especificado.
