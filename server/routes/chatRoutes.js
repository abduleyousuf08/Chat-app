import express from 'express';

const router = express.Router();

import {
   createChat,
   findChat,
   findMyChats,
   deleteChat,
} from '../controllers/chatControllers.js';

import protect from '../middlewares/authMiddleware.js';

router.post('/create', protect, createChat);
router.get('/find-my-chats/:id', findMyChats);
router.get('/findChat/:secondId', protect, findChat);
router.delete(`/delete/:chatId`, protect, deleteChat);

export default router;
