const { Router } = require('express');
const authenticate = require('../middlewares/auth.middlewares');
const { addProductToCart, getCart, updateCart, delProductInCart, emptyCart } =require('../controllers');

const router = Router();

/**
 * @openapi
 * /api/v1/cart:
 *   post:
 *     security:
 *         - bearerAuth: []
 *     summary: Add product to cart
 *     tags: [Cart]
 *     requestBody:
 *       description: To add a product to the cart, you need a productId and quantity
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/add product to cart"
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
 *                    {}
 *   get:
 *     security:
 *         - bearerAuth: []
 *     summary: Get user's cart
 *     tags: [Cart]
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
 *     summary: Update product in cart
 *     tags: [Cart]
 *     requestBody:
 *       description: only quantity can be updated and you need a productId
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/update product in cart"
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
 *     summary: Empty the entire cart
 *     tags: [Cart]
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
 * /api/v1/cart/{productId}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove a product from cart
 *     tags: [Cart]
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

router.post('/cart', authenticate, addProductToCart);

router.get('/cart', authenticate, getCart);

router.patch('/cart', authenticate, updateCart);

router.delete('/cart/:productId', authenticate, delProductInCart);

router.delete('/cart', authenticate, emptyCart);

module.exports = router;

