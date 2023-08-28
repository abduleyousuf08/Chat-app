import express from 'express';

const router = express.Router();

import {
   createMessage,
   findMessages,
} from '../controllers/messageControllers.js';
import protect from '../middlewares/authMiddleware.js';

router.post('/create', protect, createMessage);
router.get('/findMessage/:chatId', findMessages);

export default router;
