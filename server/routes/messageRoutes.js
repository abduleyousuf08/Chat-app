import express from 'express';

const router = express.Router();

import {
   createMessage,
   findMessages,
   deleteMessages,
} from '../controllers/messageControllers.js';
import protect from '../middlewares/authMiddleware.js';

router.post('/create', protect, createMessage);
router.get('/findMessage/:chatId', findMessages);
router.delete(`/delete/:id`, deleteMessages);

export default router;
