const { userRegister, getInfoUser, updateUser } = require('./users.controllers');
const { userLogin } = require('./auth.controllers');
const { createCategory, getAllCategories } = require('./categories.controllers');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('./products.controllers');
const { addProductToCart, getCart, updateCart, delProductInCart, emptyCart } = require('./carts.controllers');
const { genOrder, getUserOrders } = require('./orders.controllers');

module.exports = {
    //Users
    userRegister,
    getInfoUser,
    updateUser,
    //Auth
    userLogin,
    //Categories
    createCategory,
    getAllCategories,
    //Products
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    //Cart
    addProductToCart,
    getCart,
    updateCart,
    delProductInCart,
    emptyCart,
    //Order
    genOrder,
    getUserOrders
}