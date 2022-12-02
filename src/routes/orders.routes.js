const { Router } = require('express');
const authenticate = require('../middlewares/auth.middlewares');
const { genOrder, getUserOrders } = require('../controllers');

const router = Router();

router.post('/orders', authenticate, genOrder);

router.get('/orders', authenticate, getUserOrders);

module.exports = router;