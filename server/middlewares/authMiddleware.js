import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';

const protect = async (req, res, next) => {
   //? Accessing the JWT token which i store inside HTTP_ONLY_COOKIE
   let token = req.cookies.jwt;

   if (token) {
      try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = await userModel
            .findById(decoded.userId)
            .select('-password');

         next();
      } catch (error) {
         console.log(error);
         res.status(401).json('Not authorize, no token');
      }
   } else {
      res.status(401).json('Create Account or Logged before this access');
   }
};

export default protect;
