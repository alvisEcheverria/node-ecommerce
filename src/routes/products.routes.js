const { Router } = require('express');
const authenticate = require('../middlewares/auth.middlewares');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers');

const router = Router();

router.post('/products', authenticate, createProduct);

router.get('/products', authenticate, getAllProducts);

router.get('/products/:productId', authenticate, getProductById);

router.put('/products/:productId', authenticate, updateProduct);

router.delete('/products/:productId', authenticate, deleteProduct);

module.exports = router;