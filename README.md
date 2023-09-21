# Proyecto Full Stack 

Este proyecto full stack se centra en el desarrollo de una plataforma en línea que permite a los usuarios comprar y vender productos de segunda mano. Los usuarios pueden explorar productos, iniciar sesión, guardar publicaciones en favoritos y comunicarse con los vendedores a través de un chat en línea.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura las variables de entorno necesarias (por ejemplo, la conexión a la base de datos).
4. Ejecuta `npm start` para iniciar la aplicación.

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:
```shell
1. Haz un fork del repositorio.
2. Crea una nueva rama para tu contribución.
3. Realiza tus cambios y asegúrate de que los tests pasen.
4. Envía un Pull Request con tus cambios.
```
## Autor

Este proyecto fue desarrollado por Carlos Campagnolo y Joao Carlos.

## Modelos

Modelo de usuario:

```javascript

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: String, 
  },
  productosFavoritos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Producto',
    },
  ],
});

module.exports = mongoose.model('Usuario', userSchema);
```
Modelo de producto:

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  ubicacionVendedor: {
    type: String, 
  },
  estado: {
    type: String,
    enum: ['usado', 'nuevo', 'como nuevo'], 
  },
  imagenes: [String],
  fechaPublicacion: {
    type: Date,
    default: Date.now,
  },
   disponible: {
    type: Boolean,
    default: true,
  },
  vendedor: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
});

module.exports = mongoose.model('Producto', productoSchema);
```

Modelo de Chat:
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  comprador: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  vendedor: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  mensajes: [
    {
      autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
      },
      contenido: {
        type: String,
        required: true,
      },
      fechaHora: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('Chat', chatSchema);

```

## Rutas de la Aplicación

| Ruta                    | Tipo de Llamada | Descripción                                  | Respuesta                  |
|--------------------------|-----------------|----------------------------------------------|---------------------------|
| /                        | GET             | Página de inicio con productos destacados     | Lista de productos en HTML  |
| /login                   | POST            | Inicio de sesión de usuario                   | Token de autenticación de usuario |
| /logout                  | POST            | Cierre de sesión de usuario                   | Mensaje o estado de éxito |
| /signup                  | POST            | Registro de usuario                           | Nuevo objeto de usuario o estado de éxito |
| /productos                | GET             | Obtener todos los productos                   | Lista de productos en JSON  |
| /productos/:id            | GET             | Obtener detalles de un producto específico   | Detalles del producto en JSON   |
| /productos/crear         | POST            | Crear un nuevo producto                       | Nuevo objeto de producto o estado de éxito |
| /productos/:id/edit       | PUT            | Editar detalles de un producto específico    | Objeto de producto actualizado o estado de éxito |
| /productos/:id/eliminar     | DELETE       | Eliminar un producto específico              | Mensaje de éxito o estado |
| /favoritos               | GET             | Obtener productos favoritos del usuario      | Lista de productos favoritos en JSON |
| /favoritos/agregar/:id       | POST         | Agregar un producto a favoritos del usuario | Mensaje de éxito o estado |
| /favoritos/eliminar/:id    | DELETE       | Eliminar un producto de favoritos del usuario| Mensaje de éxito o estado |
| /carrito                    | GET          | Obtener carrito de compras del usuario       | Detalles del carrito en JSON |
| /carrito/agregar/:id            | POST    | Agregar un producto al carrito de compras     | Detalles del carrito actualizados o estado de éxito |
| /carrito/editar/:id           | PUT         | Editar cantidad de un producto en el carrito  | Detalles del carrito actualizados o estado de éxito |
| /carrito/eliminar/:id         | DELETE      | Eliminar un producto del carrito de compras   | Detalles del carrito actualizados o estado de éxito |
| /ordenes                  | GET          | Obtener historial de órdenes del usuario     | Lista de órdenes del usuario en JSON |
| /ordenes/crear           | POST         | Crear una nueva orden                         | Nuevo objeto de orden o estado de éxito |
| /ordenes/:id              | GET          | Obtener detalles de una orden específica     | Detalles de la orden en JSON      |
| /ordenes/:id/editar         | PUT         | Editar detalles de una orden específica      | Detalles de la orden actualizados o estado de éxito |
| /ordenes/:id/eliminar       | DELETE      | Eliminar una orden específica                | Mensaje de éxito o estado |
| /chats                   | GET          | Obtener conversaciones de chat del usuario    | Lista de conversaciones de chat en JSON |
| /chats/crear/:userId    | POST         | Crear una nueva conversación de chat          | Nuevo objeto de conversación de chat o estado de éxito |
| /chats/:id               | GET          | Obtener mensajes de una conversación específica | Lista de mensajes en JSON   |
| /chats/:id/enviar-mensaje  | POST         | Enviar un mensaje en una conversación de chat | Mensajes de chat actualizados o estado de éxito |

¡Gracias por utilizar nuestra plataforma de compra y venta en línea similar a Wallapop!