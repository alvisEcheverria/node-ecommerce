const Users = require('./users.models');
const Categories = require('./categories.models');
const Products = require('./products.models');
const Carts = require('./carts.models');
const Orders = require('./orders.models');
const ProductsInCarts = require('./productsInCart.models');
const ProductsInOrders = require('./productsInOrders.models');

module.exports = { 
    Users,
    Categories,
    Products,
    Carts,
    Orders,
    ProductsInCarts,
    ProductsInOrders
};