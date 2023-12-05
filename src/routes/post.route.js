import express from 'express';
import { getAll, createPost, findById, findByUserId } from '../controllers/post.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Post
 *     description: Operaciones relacionadas con los posts
 * /post:
 *   get:
 *     summary: Obtener TODOS los posts
 *     description: Obtener datos de ejemplo
 *     tags:
 *       - Post
 *     responses:
 *       '200':
 *         description: Éxito
 */
router.get('', getAll);

/**
 * @swagger
 * tags:
 *   - name: Post
 *     description: Operaciones generales con posts
 * /post:
 *   post:
 *     summary: Crear un posts
 *     description: Obtener datos de ejemplo
 *     tags:
 *       - Post
 *     requestBody:
 *       description: Datos del nuevo post
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Post creado con éxito
 */
router.post('', createPost);


router.get('/:id', findById);
router.get('/user/:id', findByUserId);

/**
 * @swagger
 * tags:
 *   - name: Post
 *     description: Operaciones relacionadas con los posts
 * /post/{id}:
 *   delete:
 *     summary: Eliminar un post por ID
 *     description: Eliminar un post específico por su identificador
 *     tags:
 *       - Post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único del post a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Éxito
 *       '404':
 *         description: Post no encontrado
 */
router.delete('/user/delete', findByUserId);

export default router;