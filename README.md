# eshop

Desarrollo de un Shopping Cart utilizando NodeJs, Nestjs y RabbitMQ para el Back-End y una aplicación en angula para el Front-End

## Especificaciones
1. Es un proyecto de test que consta de una arquitectura de microservicios con comunicación por API Restful.
2. Consta de 3 proyectos o servicios:
- products. Contiene el catálogo de productos que se utilizaron para realizar el desarrollo. puerto 3000.
- orders. Ordenes generadas al momento del checkout en el carrito. puerto 3001
- basket. Carrito de compras (temporal). puerto 3002
3. Cada proyecto tiene un diferente patrón de diseño (CQRS, DDD, CRUD) para evidenciar el manejo de la arquitectura.

> Cada servicio es un proyecto desarrollado con NestJs y se comunican mediante RabbitMQ (https://api.cloudamqp.com/).
Se conectan a una misma base de datos en MySQL, sin embargo, es posible utilizar otro motor si fuera el caso, basta con cambiar la cadena de conexion.


### El proyecto cubre lo siguiente:
- El usuario puede buscar productos por varios criterios: nombre, sku, precios, etc.
- Los resultados son mostrados por paginación.
- Se puede elegir cuantos productos se desean agergar al carrito.
- Se puede editar la cantidad de un producto en el carrito.
- Se vacía el carrito cuando se crea una nueva ordern
- El usuario visualiza un resumen de sus órdenes y el status de los mismos.
- Entre otras...

### Development server
Correr nest start --watch para modo de desarrollo. Navege a http://localhost:$PORT/.

Code scaffolding
Correr nest generate --options--. Se puede usar lo disponible para NestJs ng generate module|pipe|service|class|guard|interface|controller.

Build
Correr nest build para deployar el proyecto.

