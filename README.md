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

| Ruta                   | Tipo de Llamada | Descripción                                   | Respuesta                 |
|------------------------|-----------------|-----------------------------------------------|---------------------------|
| /                      | GET             | Página de inicio con productos destacados     | Lista de productos en HTML|
| /login                 | GET             | Página de inicio de sesión                    | Formulario de inicio de sesión|
| /login                 | POST            | Iniciar sesión                                | Redirección a la página principal|
| /products              | GET             | Lista de todos los productos                 | Lista de productos en HTML|
| /products/:id          | GET             | Detalles de un producto                       | Detalles del producto en HTML|
| /favorites             | GET             | Lista de productos favoritos del usuario      | Lista de productos en HTML|
| /chat/:sellerId        | GET             | Chat en línea con un vendedor                 | Chat en HTML              |
| /api/products          | POST            | Publicar un nuevo producto                    | Producto publicado en JSON|
| /api/products/:id      | PUT             | Actualizar detalles de un producto            | Producto actualizado en JSON|
| /api/products/:id      | DELETE          | Eliminar un producto                          | Mensaje de confirmación   |

¡Gracias por utilizar nuestra plataforma de compra y venta en línea similar a Wallapop!