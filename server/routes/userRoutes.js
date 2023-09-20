import express from 'express';
import multer from 'multer';

const router = express.Router();

import {
   login,
   logout,
   getUserProfile,
   updateUserProfile,
   findUser,
   createAccount,
   searchUsersByName,
} from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';

//Todo: destination to store and filename system logic using multer
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'images');
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
   },
});

const upload = multer({ storage: storage });

router.post('/', createAccount);
router.post('/login', login);
router.post('/logout', logout);

router
   .route('/profile')
   .get(protect, getUserProfile)
   .put(protect, upload.single('profile'), updateUserProfile);

router.route('/users/:id').get(findUser);
// Add the new route to search for users by name
router.get('/search', searchUsersByName);

export default router;
