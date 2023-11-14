import express from 'express';
import { login } from '../controllers/authentication.controller.js';
import { validateLogin } from '../middlewares/login.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: Operaciones generales con posts
 * /login:
 *   post:
 *     summary: Login
 *     description: Obtener datos de ejemplo
 *     tags:
 *       - Login
 *     requestBody:
 *       description: Datos del nuevo post
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Post creado con éxito
 */
router.post('', validateLogin, login);

export default router;