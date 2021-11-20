# eshop

Desarrollo de un Shopping Cart utilizando NodeJs, Nestjs y RabbitMQ para el Back-End y una aplicación en angula para el Front-End

## Especificaciones
1. Es un proyecto de test que consta de una arquitectura de microservicios con comunicación por API Restful.
2. Consta de 3 proyectos o servicios:
- products. Contiene el catálogo de productos que se utilizaron para realizar el desarrollo. puerto 3000.
- orders. Ordenes generadas al momento del checkout en el carrito. puerto 3001
- basket. Carrito de compras (temporal). puerto 3002

> Cada servicio es un proyecto desarrollado con NestJs y se comunican mediante RabbitMQ (https://api.cloudamqp.com/).
Se conectan a una misma base de datos en MySQL, sin embargo, se puede direccionar a otro motor si fuera el caso solo con cambiar la cadenas de conexion.
La idea es demostrar el manejo de microservicios y como se comunican los servicios entre ellos.

## Especificaciones
