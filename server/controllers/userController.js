import validator from 'email-validator';
import userModel from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// Todo ?...
//? Todo: Login this will allow the user to login their account and generate a token to save the cookie
//? Todo: @logout this will allow the user to logout their account and delete the cookie data
//? Todo: @getUserProfile this will allow the logged in user to access their profile
//? Todo: @updateUserProfile this will allow the logged in user to update their profile
//? Todo :@getFriends this will allow the logged in user to get their friends
//? Todo: @getFriends before get the list of friends the user should search some user and message their to mark as list of friends

//Todo: Login  Account
async function login(req, res) {
   const { email, password } = req.body;
   try {
      if (!email || !password) {
         return res.status(400).json('Email & Password are required');
      }

      if (password.length < 6) {
         return res.status(400).json('Enter strong Password');
      }

      const validateEmail = validator.validate(email);

      if (!validateEmail) {
         return res.status(401).json('Enter valid Email');
      }

      const user = await userModel.findOne({ email });

      if (!user) {
         return res.status(401).json('Incorrect Email or Password ');
      }

      const comparedPasswords = bcrypt.compare(password, user.password);

      if (!comparedPasswords) {
         return res.status(401).json(' Incorrect Email or Password');
      }

      generateToken(res, user._id);

      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
      });
   } catch (error) {
      console.log(error);
   }
}

//Todo: Logout Account

const logout = (req, res) => {
   res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
   });

   res.status(200).json('Logged Out successfully');
};

//Todo: Access Profile

const getUserProfile = async (req, res) => {
   const user = req.user;

   if (user) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         bio: user.bio,
      });
   } else {
      res.status(400).json('Un authorized');
   }
};

//Todo: Update Profile

const updateUserProfile = async (req, res) => {
   const { name, email, password, bio } = req.body;

   if (!name && !email && !password && !bio) {
      return res.status(400).json('Provide some value to update');
   }

   const user = await userModel.findById(req.user._id);

   if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.bio = bio || user.bio;

      if (password) {
         user.password = bcrypt.genSalt(10, password) || user.password;
      }

      const userUpdated = await user.save();

      res.status(200).json({
         Message: 'SUCCESSFULLY UPDATED',
         user: {
            _id: userUpdated._id,
            name: userUpdated.name,
            email: userUpdated.email,
            bio: userUpdated.bio,
         },
      });
   } else {
      return res.status(400).json('User Not found');
   }
};

const getFriends = (req, res) => {
   res.status(200).json('Hello from updateUserProfile ');
};

const findUser = async (req, res) => {
   const id = req.params.id;

   try {
      const userDetails = await userModel.findOne({ _id: id });
      res.status(200).json({ data: userDetails });
   } catch (error) {
      console.log(error);
   }
};

export {
   login,
   logout,
   getUserProfile,
   updateUserProfile,
   getFriends,
   findUser,
};
