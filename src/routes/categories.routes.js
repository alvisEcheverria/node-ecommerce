const { Router } = require('express');
const authenticate = require('../middlewares/auth.middlewares');
const { createCategory, getAllCategories } = require('../controllers');

const router = Router();

router.post('/products/categories', authenticate, createCategory)
router.get('/products/categories', authenticate, getAllCategories)

module.exports = router;