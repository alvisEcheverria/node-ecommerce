const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce',
            version: '1.0.0',
            description: 'Tienda ecommerce'
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