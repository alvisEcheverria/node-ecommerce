const { Router } = require('express');
const authenticate = require('../middlewares/auth.middlewares');
const { addProductToCart, getCart, updateCart, delProductInCart } =require('../controllers');

const router = Router();

router.post('/cart', authenticate, addProductToCart);

router.get('/cart', authenticate, getCart);

router.put('/cart', authenticate, updateCart);

router.delete('/cart/:productId', authenticate, delProductInCart)

module.exports = router;