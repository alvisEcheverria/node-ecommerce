const userRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');
const productsRoutes = require('./products.routes');
const categoriesRoutes = require('./categories.routes');
const cartsRoutes = require('./carts.routes');
const ordersRoutes = require('./orders.routes');

module.exports = {
    userRoutes,
    authRoutes,
    productsRoutes,
    categoriesRoutes,
    cartsRoutes,
    ordersRoutes
}