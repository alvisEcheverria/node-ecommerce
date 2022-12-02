const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./utils/database');
const handleError = require('./middlewares/error.middlewares');
const initModels = require('./models/initModels');
const { userRoutes, authRoutes, productsRoutes, categoriesRoutes, cartsRoutes, ordersRoutes } = require('./routes');

const app = express();

const apiRoute = '/api/v1';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

initModels();

db.authenticate()
    .then(()=> console.log('Autenticación exitosa'))
    .catch(error => console.log(error));

db.sync({force: false})
    .then(() => console.log('Base de datos sincronizada'))
    .catch(error => console.log(error));

app.get('/', (req, res) =>{
    console.log('Bienvenido al server');
});

app.use(apiRoute, authRoutes);
app.use(apiRoute, userRoutes);
app.use(apiRoute, categoriesRoutes);
app.use(apiRoute, productsRoutes);
app.use(apiRoute, cartsRoutes);
app.use(apiRoute, ordersRoutes);

app.use(handleError);

module.exports = app;