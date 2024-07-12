# Enunciado del Ejercicio

En este ejercicio, vas a crear una API REST utilizando Express y Mongoose para gestionar una colección de productos tecnológicos. La API debe permitir realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) sobre los productos. Los productos ya vienen incluidos en el repositorio.

## Requisitos

1. **Configurar el proyecto:**
   - Inicializa un nuevo proyecto con `npm init`.
   - Instala las dependencias necesarias: `express`, `mongoose`, y `morgan`.

2. **Configurar Mongoose:**
   - Crea una conexión a MongoDB usando Mongoose.
   - Define un modelo de Mongoose para los productos tecnológicos con la estructura especificada.

3. **Crear el servidor Express:**
   - Configura un servidor Express.
   - Utiliza middleware para parsear JSON y loguear solicitudes HTTP.

4. **Implementar las rutas de la API:**
   - `GET /`: Devuelve un mensaje de bienvenida a la API.
   - `GET /productos`: Devuelve todos los productos. Permite filtrar por categoría mediante query string.
   - `GET /productos/:id`: Devuelve un producto por su ID.
   - `POST /productos`: Crea un nuevo producto.
   - `DELETE /productos/:id`: Elimina un producto por su ID.
   - `PATCH /productos/:id`: Actualiza parcialmente un producto por su ID.
   - `PUT /productos/:id`: Actualiza completamente un producto por su ID.

5. **Implementar 5 rutas adicionales:**
   - `GET /productos/importes/mayor/:importe`: Devuelve los productos con un importe mayor al especificado.
   - `GET /productos/importes/menor/:importe`: Devuelve los productos con un importe menor al especificado.
   - `GET /productos/categorias`: Devuelve una lista de todas las categorías disponibles.
   - `GET /productos/nombre/:nombre`: Devuelve los productos que coinciden con el nombre especificado (búsqueda parcial).
   - `GET /productos/rango/:min/:max`: Devuelve los productos cuyo importe esté dentro del rango especificado.

## Entrega

Sube tu código a un repositorio en GitHub y proporciona el enlace para revisión. Asegúrate de incluir instrucciones claras sobre cómo ejecutar tu proyecto en el archivo README.md del repositorio. Además, incluye un archivo `api.http` con las llamadas a la API para realizar las pruebas correspondientes.