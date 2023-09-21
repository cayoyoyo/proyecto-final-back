# Proyecto Full Stack de Ejemplo - Plataforma de Compra y Venta Similar a Wallapop

Este proyecto full stack se centra en el desarrollo de una plataforma en línea que permite a los usuarios comprar y vender productos de segunda mano de manera similar a Wallapop. Los usuarios pueden explorar productos, iniciar sesión, guardar publicaciones en favoritos y comunicarse con los vendedores a través de un chat en línea.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura las variables de entorno necesarias (por ejemplo, la conexión a la base de datos).
4. Ejecuta `npm start` para iniciar la aplicación.

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu contribución.
3. Realiza tus cambios y asegúrate de que los tests pasen.
4. Envía un Pull Request con tus cambios.

## Autor

Este proyecto fue desarrollado por [Tu Nombre].

## Rutas de la Aplicación

| Route                    | Request Type | Description                                  | Response                  |
|--------------------------|--------------|----------------------------------------------|---------------------------|
| /                        | GET          | Home page with featured products             | List of products in HTML  |
| /login                   | POST         | User login                                   | User authentication token |
| /logout                  | POST         | User logout                                  | Message or success status |
| /signup                  | POST         | User registration                            | New user object or success status |
| /products                | GET          | Get all products                            | List of products in JSON  |
| /products/:id            | GET          | Get details of a specific product            | Product details in JSON   |
| /products/create         | POST         | Create a new product                         | New product object or success status |
| /products/:id/edit       | PUT          | Edit details of a specific product           | Updated product object or success status |
| /products/:id/delete     | DELETE       | Delete a specific product                    | Success message or status |
| /favorites               | GET          | Get user's favorite products                | List of favorite products in JSON |
| /favorites/add/:id       | POST         | Add a product to user's favorites            | Success message or status |
| /favorites/remove/:id    | DELETE       | Remove a product from user's favorites       | Success message or status |
| /cart                    | GET          | Get user's shopping cart                     | Shopping cart details in JSON |
| /cart/add/:id            | POST         | Add a product to the shopping cart           | Updated shopping cart details or success status |
| /cart/edit/:id           | PUT          | Edit product quantity in the shopping cart   | Updated shopping cart details or success status |
| /cart/remove/:id         | DELETE       | Remove a product from the shopping cart      | Updated shopping cart details or success status |
| /orders                  | GET          | Get user's order history                    | List of user's orders in JSON |
| /orders/create           | POST         | Create a new order                           | New order object or success status |
| /orders/:id              | GET          | Get details of a specific order              | Order details in JSON      |
| /orders/:id/edit         | PUT          | Edit details of a specific order             | Updated order details or success status |
| /orders/:id/delete       | DELETE       | Delete a specific order                      | Success message or status |
| /chats                   | GET          | Get user's chat conversations                | List of chat conversations in JSON |
| /chats/create/:userId    | POST         | Create a new chat conversation               | New chat conversation object or success status |
| /chats/:id               | GET          | Get messages from a specific chat            | List of messages in JSON   |
| /chats/:id/send-message  | POST         | Send a message in a chat                     | Updated chat messages or success status |


¡Gracias por utilizar nuestra plataforma de compra y venta en línea similar a Wallapop!