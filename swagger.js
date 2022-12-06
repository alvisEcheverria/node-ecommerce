const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce',
            version: '1.0.0',
            description: 
            'Ecommerce para ventas de todo tipo, el usuario puede registrarse, actualizar su contraseña, crear nuevas categorias, crear nuevos productos, actualizar productos, agregar productos al carrito, vaciarlo, eliminar productos en especifico, actualizar las cantidades de los productos en el carrito, comprar y ver las ordenes de las compras ejecutadas con su precio por producto, subtotal y total. Se enviará un correo cuando el usuario sea creado y cuando realice una compra'
        }
    },
    apis: [
        './src/models/users.models.js',
        './src/routes/users.routes.js',
        './src/routes/auth.routes.js',
        './src/models/categories.models.js',
        './src/routes/categories.routes.js',
        './src/models/products.models.js',
        './src/routes/products.routes.js',
        './src/models/carts.models.js',
        './src/routes/carts.routes.js',
        './src/routes/orders.routes.js',
    ]
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port)=> {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (req, res) =>{
        res.setHeader('ContentType', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Documentación disponible en http://localhost:${port}/api/v1/docs`);
};

module.exports = swaggerDocs;