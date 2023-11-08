import express from 'express';
const router = express.Router();

import authenticationRouter from './authentication.route.js';
import userRouter from './user.route.js';
import postRouter from './post.route.js';

router.use('/login', authenticationRouter);
router.use('/user', userRouter);
router.use('/post', postRouter);


export default router;