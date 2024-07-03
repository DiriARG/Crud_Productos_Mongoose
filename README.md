# Actividad: CRUD de productos con Mongoose 🧐
En este ejercicio se realiza una API REST utilizando Express JS y Mongoose para gestionar una colección de productos tecnológicos. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) sobre los productos.

## Desarrollador:
Matías Di Risio 👍 
- https://github.com/DiriARG

## Tabla de contenidos
- [Previo a iniciar](#previo-a-iniciar)
- [Iniciando el proyecto](#iniciando-el-proyecto)
- [Configuramos el archivo .env (Environment Variables)](#configuramos-el-archivo-env-environment-variables)
- [Rutas de la API REST](#rutas-de-la-api-rest)

## Previo a iniciar:
- Debemos crear una nueva base de datos en MongoDB Compass.
- Luego importaremos el archivo .json llamado "productos.json" en nuestra base de datos haciendo click a "ADD DATA" --> "Import JSON or CSV file".

## Iniciando el proyecto:
- Abrimos la terminal e inicializamos un nuevo proyecto con `npm init -y`.
- Luego instalamos las dependencias necesarias: Express JS (Entorno para desarrollar la API), Mongoose (Biblioteca de modelado de objetos para MongoDB y Node.js) y Morgan (Middleware de registro de solicitudes HTTP); `npm i express mongoose morgan`.

## Configuramos el archivo .env (Environment Variables):
En este caso cambiamos el nombre del archivo llamado `.env copy` a `.env`, luego modificamos su contenido:
- MONGODB_URLSTRING: Copiamos la cadena de conexión desde la pagina de MongoDB o propiamente en el MongoDB Compass.
- PORT: Escribimos el puerto que se va a usar para conectar a la API.
- DATABASE_NAME: Escribimos el nombre de la base de datos en la cual vamos a acceder.
- COLLECTION_NAME: Escribimos el nombre de la collection que nos va a permitir obtener los datos necesarios para nuestra API.

## Estructura del proyecto:

```plaintext
/src
  - mongoose.js
  - productoModel.js
/.env
/api.http
/LICENSE
/package-lock.json
/package.json
/productos.json
/server.js
/README.md
```
## Rutas de la API REST:
Dentro del archivo `api.http` se van a encontrar rutas con las siguientes finalidades:
| PETICIÓN | URL | DESCRIPCIÓN |
|:--------:|-----|-------------|
| GET | "/" | Ruta principal (Devuelve un mensaje de bienvenida a la API). |
| GET | "/productos" | Muestra todos los productos. También permite filtrar por categoría. |
| GET | "/productos/categorias" | Devuelve una lista de todas las categorías disponibles. |
| GET | "/productos/:id" | Devuelve un producto por su ID. |
| POST | "/productos" | Crear un nuevo producto. |
| DELETE | "/productos/:id" | Eliminar un producto por su ID. |
| PATCH | "/productos/:id" | Actualizar parcialmente un producto por su ID. |
| PUT | "/productos/:id" | Actualizar completamente un producto por su ID. |
| GET | "/productos/importes/mayor/:importe" | Mostrar todos los productos con un importe mayor al especificado. |
| GET | "/productos/importes/menor/:importe" | Mostrar todos los productos con un importe menor al especificado. |
| GET | "/productos/nombre/:nombre" | Mostrar los productos que coinciden con el nombre especificado (búsqueda parcial). |
| GET | "/productos/rango/:min/:max" | Mostrar los productos cuyo importe esté dentro del rango especificado. |


