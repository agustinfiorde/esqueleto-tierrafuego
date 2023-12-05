import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const router = express.Router();

import authenticationRouter from './authentication.route.js';
import userRouter from './user.route.js';
import postRouter from './post.route.js';

router.use('/login', authenticationRouter);
router.use('/user', userRouter);
router.use('/post', postRouter);

router.use('/chat', (req, res) => {
    const currentModulePath = fileURLToPath(import.meta.url);
    const currentDirPath = dirname(currentModulePath);
    const chatFilePath = path.resolve(currentDirPath, '../public/chat.html');
    res.sendFile(chatFilePath);
});


export default router;