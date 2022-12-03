const { Router } = require('express');
const { userLogin } = require('../controllers');

const router = Router();

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Login]
 *     requestBody:
 *       description: Insert email and password for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: alvis.cm@gmail.com
 *               password:
 *                 type: string
 *                 example: 123
 *     responses:
 *       200:
 *         description: success login 
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
 *                     {}
 */

router.post('/auth/login', userLogin);

module.exports = router;