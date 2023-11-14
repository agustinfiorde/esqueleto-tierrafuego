import express from 'express';
import { UserController } from './../controllers/user.controller.js';
import { } from './../middlewares/authorization.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operaciones relacionadas con los usuarios
 * /user:
 *   get:
 *     summary: Obtener TODOS los usuarios
 *     description: Obtener datos de ejemplo
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Éxito
 */
router.get('', UserController.getAll);
router.post('', UserController.create);

export default router;