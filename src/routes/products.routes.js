const { Router } = require('express');
const authenticate = require('../middlewares/auth.middlewares');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers');

const router = Router();

/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     security:
 *         - bearerAuth: []
 *     summary: Create new product
 *     tags: [Products]
 *     requestBody:
 *       description: To create a new product you need a title, description, price, productImgs, quantity and categoryId
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/create product"
 *     responses:
 *       201:
 *         description: created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/product"
 *   get:
 *     security:
 *         - bearerAuth: []
 *     summary: Get all products default
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items: {}
 * /api/v1/products?offset={offset}&limit={limit}:
 *   get:
 *     security:
 *         - bearerAuth: []
 *     summary: Get all products with queries
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: offset
 *         required: true
 *         description: offset = page
 *       - in: query
 *         name: limit
 *         required: true
 *         description: limit = products per page
 *         schema:
 *           type: string
 *           minimum: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items: {}
 * /api/v1/products/{productId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: product Id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items: {}
 *   patch:
 *     security:
 *         - bearerAuth: []
 *     summary: Update product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: product Id
 *     requestBody:
 *       description: only title, description, price and quantity can be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/update product"
 *     responses:
 *       200:
 *         description: updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     []
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: product Id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items: {}
 */

router.post('/products', authenticate, createProduct);

router.get('/products', getAllProducts);

router.get('/products/:productId', authenticate, getProductById);

router.patch('/products/:productId', authenticate, updateProduct);

router.delete('/products/:productId', authenticate, deleteProduct);

module.exports = router;