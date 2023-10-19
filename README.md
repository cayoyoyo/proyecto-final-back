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
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dzau21or3/image/upload/v1696676219/products/zcec5ay3iowms1aeylws.jpg",
  },
  location: {
    type: String,
    enum: [
      "Álava",
      "Albacete",
      "Alicante",
      "Almería",
      "Asturias",
      "Ávila",
      "Badajoz",
      "Barcelona",
      "Burgos",
      "Cáceres",
      "Cádiz",
      "Cantabria",
      "Castellón",
      "Ciudad Real",
      "Córdoba",
      "Cuenca",
      "Gerona",
      "Granada",
      "Guadalajara",
      "Guipúzcoa",
      "Huelva",
      "Huesca",
      "Islas Balears",
      "Jaén",
      "La Coruña",
      "La Rioja",
      "Las Palmas",
      "León",
      "Lérida",
      "Lugo",
      "Madrid",
      "Málaga",
      "Murcia",
      "Navarra",
      "Orense",
      "Palencia",
      "Pontevedra",
      "Salamanca",
      "Santa Cruz de Tenerife",
      "Segovia",
      "Sevilla",
      "Soria",
      "Tarragona",
      "Teruel",
      "Toledo",
      "Valencia",
      "Valladolid",
      "Vizcaya",
      "Zamora",
      "Zaragoza",
    ],
  },
  favoriteProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  productsForSale: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  chatsId: [],
  isPrime: { type: Boolean},
});

module.exports = mongoose.model("User", userSchema);

```
Modelo de producto:

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
     enum: ["used", "new", "like new"],
  },
  images: [String],
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: [
      "Electrodomésticos",
      "Muebles",
      "Electrónica",
      "Ropa y Accesorios",
      "Herramientas",
      "Juguetes",
      "Vehículos",
      "Deportes y Fitness",
      "Arte y Antigüedades",
      "Libros y Revistas",
      "Otros",
    ],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

```


## Rutas de la Aplicación

| Ruta                    | Tipo de Llamada | Descripción                                  | Respuesta                  |
|--------------------------|-----------------|----------------------------------------------|---------------------------|
| /                        | GET             | Página de inicio con productos destacados     | Lista de productos en HTML  |
| /login                   | POST            | Inicio de sesión de usuario                   | Token de autenticación de usuario |
| /perfil                   | ...            | Inicio de sesión de usuario                   | Token de autenticación de usuario |
| /signup                  | POST            | Registro de usuario                           | Nuevo objeto de usuario o estado de éxito |
| /productos                | GET             | Obtener todos los productos                   | Lista de productos en JSON  |
| /productos/:id            | GET             | Obtener detalles de un producto específico   | Detalles del producto en JSON   |
| /productos/crear         | POST            | Crear un nuevo producto                       | Nuevo objeto de producto o estado de éxito |
| /productos/:id/edit       | PUT            | Editar detalles de un producto específico    | Objeto de producto actualizado o estado de éxito |
| /productos/:id/eliminar     | DELETE       | Eliminar un producto específico              | Mensaje de éxito o estado |
| /favoritos/agregar/:id       | POST         | Agregar un producto a favoritos del usuario | Mensaje de éxito o estado |
| /favoritos/eliminar/:id    | DELETE       | Eliminar un producto de favoritos del usuario| Mensaje de éxito o estado |
| /chats                   | GET          | Obtener conversaciones de chat del usuario    | Lista de conversaciones de chat en JSON |
| /chats/crear/:userId    | POST         | Crear una nueva conversación de chat          | Nuevo objeto de conversación de chat o estado de éxito |
| /chats/:id               | GET          | Obtener mensajes de una conversación específica | Lista de mensajes en JSON   |
| /chats/:id/enviar-mensaje  | POST         | Enviar un mensaje en una conversación de chat | Mensajes de chat actualizados o estado de éxito |

¡Gracias por utilizar nuestra plataforma de compra y venta en línea similar a Wallapop!
