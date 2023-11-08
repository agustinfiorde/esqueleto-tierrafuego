import express from 'express';
import { getAll, createPost, findById, findByUserId } from '../controllers/post.controller.js';

const router = express.Router();

router.get('', getAll);
router.post('', createPost);
router.get('/:id', findById);
router.get('/user/:id', findByUserId);

export default router;