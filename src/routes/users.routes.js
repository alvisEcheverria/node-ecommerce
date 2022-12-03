const { Router } = require('express');
const { userRegister, getInfoUser, updateUser } = require('../controllers');
const authenticate = require('../middlewares/auth.middlewares');

const router = Router();

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     summary: Register a new user into the app
 *     tags: [Users]
 *     requestBody:
 *       description: To register a new user you need a firstname, lastname, email, phone and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/register"
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
 *                     $ref: "#/components/schemas/user"
 *   get:
 *     security:
 *         - bearerAuth: []
 *     summary: Get user information
 *     tags: [Users]
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
 *   put:
 *     security:
 *         - bearerAuth: []
 *     summary: update User
 *     tags: [Users]
 *     requestBody:
 *       description: only password can be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/updateUser"
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
 */

router.post('/users', userRegister);
router.get('/users', authenticate, getInfoUser);
router.put('/users', authenticate, updateUser);

module.exports = router; 