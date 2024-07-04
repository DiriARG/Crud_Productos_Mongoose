# Actividad: CRUD de productos con Mongoose 🧐
En este ejercicio se realiza una API REST utilizando Express JS y Mongoose para gestionar una colección de productos tecnológicos. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) sobre los productos.

## Desarrollador 👨‍💻:
Matías Di Risio 👍 
- https://github.com/DiriARG

## Tabla de contenidos 📚:
- [Instalación](#instalación-)
- [Previo a iniciar](#previo-a-iniciar-)
- [Iniciando el proyecto](#iniciando-el-proyecto-)
- [Configuramos el archivo .env (Environment Variables)](#configuramos-el-archivo-env-environment-variables-%EF%B8%8F)
- [Estructura del proyecto](#estructura-del-proyecto-)
- [Descripción de archivos](#descripción-de-archivos-)
- [Rutas de la API REST](#rutas-de-la-api-rest-%EF%B8%8F)
- [Ejemplos de uso](#ejemplos-de-uso-)
- [Recursos](#recursos-)

## Instalación 📥:
1. **Fork** el repositorio desde [aquí](https://github.com/DiriARG/Crud_Productos_Mongoose/fork).
2. **Clona** tu fork en tu máquina local:
```bash
git clone https://github.com/tu-usuario/tu-repositorio-fork.git
```
3. Ahora **abre** Visual Studio Code y la carpeta correspondiente (Crud_Productos_Mongoose).
4. **Inicia** una nueva terminal y escribe `npm install`, este comando en un directorio que ya contiene el archivo `package.json` genera que npm instale las dependencias especificadas en ese `package.json` y actualice el `package-lock.json` con las versiones exactas de esas dependencias.
- Si seguiste estas instrucciones de instalación mediante forkear el repositorio y clonandolo a tu máquina local, evita el apartado [Iniciando el proyecto](#iniciando-el-proyecto-), ya que esta orientado a las personas que simplemente han descargado algunos archivos individuales del proyecto.
   
## Previo a iniciar 🕒:
- Debemos crear una nueva base de datos en MongoDB Compass.
- Luego importaremos el archivo .json llamado "productos.json" en nuestra base de datos haciendo click a "ADD DATA" --> "Import JSON or CSV file".

## Iniciando el proyecto 🚀: 
Este apartado esta orientado a las personas que simplemente quieran descargar los archivos individualmente sin forkear el repositorio, por lo tanto, los archivos que son necesarios para el correcto funcionamiento de la API REST son los siguientes: 
```plaintext
/src
  - mongoose.js
  - productoModel.js
/.env-copy
/api.http
/productos.json
/server.js
```
Teniendo dicha estructura del proyecto, proseguimos con: 
- Abrimos la terminal e inicializamos un nuevo proyecto con `npm init -y`. 
- Luego instalamos las dependencias necesarias: Express JS (Entorno para desarrollar la API), Mongoose (Biblioteca de modelado de objetos para MongoDB y Node.js) y Morgan (Middleware de registro de solicitudes HTTP); `npm i express mongoose morgan`.

## Configuramos el archivo .env (Environment Variables) ⚙️:
En este caso cambiamos el nombre del archivo llamado `.env copy` a `.env`, luego modificamos su contenido:
- MONGODB_URLSTRING: Copiamos la cadena de conexión desde la pagina de MongoDB o propiamente en el MongoDB Compass.
- PORT: Escribimos el puerto que se va a usar para conectar a la API.
- DATABASE_NAME: Escribimos el nombre de la base de datos en la cual vamos a acceder.
- COLLECTION_NAME: Escribimos el nombre de la collection que nos va a permitir obtener los datos necesarios para nuestra API.

## Estructura del proyecto 📂:
Así será la estructura que encontraremos en nuestro editor de código fuente, en mi caso, Visual Studio Code (puede variar en caso de haber instalado los archivos de forma individual).
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
## Descripción de archivos 📄:
- **/src**: Carpeta que contiene los archivos para configurar Mongoose:
  - mongoose.js: Archivo que crea una conexión usando Mongoose.
  - productoModel.js: Archivo que define un modelo de Mongoose para los productos tecnológicos.
- **/.env**: Archivo que almacena las variables de entorno.
- **/api.http**: Archivo que contiene todas las rutas de la API REST.
- **/LICENSE**: Archivo que sirve para especificar los términos y condiciones bajo los cuales el software de este repositorio puede ser utilizado, copiado, modificado o distribuido por otras personas.
- **/package-lock.json**: Archivo que asegura la reproducibilidad y consistencia de las instalaciones de paquetes en el proyecto con Node.js.
- **/productos.json**: Archivo de formato JSON que contiene los productos tecnológicos que vamos a utilizar en nuestra BD.
- **/server.js**: Archivo principal de la aplicación Node.js donde se define toda la lógica de rutas y la conexión a la base de datos.
- **/README.md**: Archivo guía para poder entender y comenzar a trabajar con este proyecto.

## Rutas de la API REST 🛤️:
Para poder comprobar la funcionalidad de cada ruta de la API vamos a utilizar la extensión `REST Client` del marketplace de Visual Studio Code o cualquier otra herramienta que tenga como finalidad el testeo de una API, como puede ser `Postman`. Los links de descarga se encuentran en [Recursos](#recursos-).<br>
Dentro del archivo `api.http` (archivo funcional si utilizamos `REST Client`) se van a encontrar rutas con las siguientes finalidades:
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

## Ejemplos de uso 🧪:
Estas acciones se realizan en el archivo `api.http`: 
- **GET**: Muestra todos los productos.
```json

GET http://localhost:3000/productos

```
Mostrar los productos de cierta categoría.
```json

GET http://localhost:3000/productos?categoria=portátil

```

- **POST**: Crear un nuevo producto.
```json

POST http://localhost:3000/productos
content-type: application/json

{
    "id": 18,
    "nombre": "Auriculares Fiio F3",
    "importe": 10000,
    "categoria": "Accesorios"
    
}

```
- **PATCH**: Actualizar parcialmente un producto por su ID.
```json

PATCH http://localhost:3000/productos/6669dc59498e236b98803312
content-type: application/json
{
    "id": 22,
    "importe": 22000
}

```
- **PUT**: Actualizar completamente un producto por su ID.
```json

PUT http://localhost:3000/productos/6669dc59498e236b98803312
content-type: application/json

{
    "id": 23,
    "nombre": "Monitor DELL",
    "importe": 250000,
    "categoria": "Periféricos"
}

```
- **DELETE**: Eliminar un producto por su ID.
```json

DELETE http://localhost:3000/productos/6669ddc6ec7c301114547bb8

```

## Recursos 🧰 
Aquí encontrarás enlaces útiles para aprender más sobre las tecnologías utilizadas en este proyecto:
- Visual Studio Code: [Visual Studio Code](https://code.visualstudio.com/)
- Node.js: [Node.js](https://nodejs.org/)
- Express: [Express](https://expressjs.com/)
- Mongoose: [Mongoose](https://mongoosejs.com/)
- Morgan: [Morgan](https://www.npmjs.com/package/morgan)
- REST Client: [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- Postman: [Postman](https://www.postman.com/)





