const { Router } = require('express');
const authenticate = require('../middlewares/auth.middlewares');
const { genOrder, getUserOrders } = require('../controllers');

const router = Router();

/**
 * @openapi
 * /api/v1/orders:
 *   post:
 *     security:
 *         - bearerAuth: []
 *     summary: Run cart checkout
 *     tags: [Orders]
 *     responses:
 *       201:
 *         description: success purshase 
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
 *     summary: Get user's purchases
 *     tags: [Orders]
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

router.post('/orders', authenticate, genOrder);

router.get('/orders', authenticate, getUserOrders);

module.exports = router;