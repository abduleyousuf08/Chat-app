import express from 'express';

const router = express.Router();

import {
   login,
   logout,
   getUserProfile,
   updateUserProfile,
   getFriends,
   findUser,
} from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';

router.post('/login', login);
router.post('/logout', logout);

router
   .route('/profile')
   .get(protect, getUserProfile)
   .put(protect, updateUserProfile);

router.route('/users/friends').get(getFriends);
router.route('/users/:id').get(findUser);

export default router;
