import jwt from 'jsonwebtoken';

const generateToken = async (res, userId) => {
   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '30d',
   });

   //? Set JWT as an HTTP_ONLY_COOKIE
   await res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'developement',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 1000,
   });
};

export default generateToken;
