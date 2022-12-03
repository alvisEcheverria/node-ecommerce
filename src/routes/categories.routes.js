const { Router } = require('express');
const authenticate = require('../middlewares/auth.middlewares');
const { createCategory, getAllCategories } = require('../controllers');

const router = Router();

/**
 * @openapi
 * /api/v1/products/categories:
 *   post:
 *     security:
 *         - bearerAuth: []
 *     summary: Create a new Category
 *     tags: [Categories]
 *     requestBody:
 *       description: Create new Category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Register category"
 *     responses:
 *       201:
 *         description: category created successfully
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
 *                     $ref: "#/components/schemas/Register category"
 *   get:
 *     security:
 *         - bearerAuth: []
 *     summary: Get all categories
 *     tags: [Categories]
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

router.post('/products/categories', authenticate, createCategory)
router.get('/products/categories', authenticate, getAllCategories)

module.exports = router;