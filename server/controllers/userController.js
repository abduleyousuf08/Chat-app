import validator from 'email-validator';
import userModel from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import uploadToCloudinary from '../middlewares/uploadToCloudinary.js';

// Todo ?...
//? Todo: Login this will allow the user to login their account and generate a token to save the cookie
//? Todo: @logout this will allow the user to logout their account and delete the cookie data
//? Todo: @getUserProfile this will allow the logged in user to access their profile
//? Todo: @updateUserProfile this will allow the logged in user to update their profile
//? Todo :@getFriends this will allow the logged in user to get their friends
//? Todo: @getFriends before get the list of friends the user should search some user and message their to mark as list of friends

//Todo: Login  Account
async function login(req, res) {
   const { LoginEmail, LoginPassword } = req.body;

   try {
      if (!LoginEmail || !LoginPassword) {
         return res.status(400).json('Email & Password are required');
      }

      const validateEmail = validator.validate(LoginEmail);

      if (!validateEmail) {
         return res.status(401).json('Enter valid Email');
      }

      const user = await userModel.findOne({ email: LoginEmail });

      if (!user) {
         return res.status(401).json('Incorrect Email or Password ');
      }

      const comparedPasswords = await bcrypt.compare(
         LoginPassword,
         user.password
      );

      if (!comparedPasswords) {
         return res.status(401).json(' Incorrect Email or Password');
      }

      generateToken(res, user._id);

      res.status(200).json({
         _id: user._id,
         name: user.firstName + ' ' + user.lastName,
         email: user.email,
         bio: user.bio,
         profile: user.profile,
      });
   } catch (error) {
      console.log(error);
   }
}

//Todo: create Account

const createAccount = async (req, res) => {
   const { firstName, lastName, email, password } = req.body;

   try {
      if (!firstName || !lastName || !email || !password) {
         return res.status(400).json('Please fill the fields');
      }

      const validateEmail = validator.validate(email);

      if (!validateEmail) {
         return res.status(401).json('Enter valid Email');
      }

      const user = await userModel.findOne({ email });

      if (user) {
         return res.status(401).json('This Email is taken already !!');
      }

      if (password.length < 6) {
         return res.status(401).json('Use Strong password');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userCreated = await userModel.create({
         firstName,
         lastName,
         email,
         password: hashedPassword,
      });

      generateToken(res, userCreated._id);

      res.json({
         _id: userCreated._id,
         name: userCreated.firstName + ' ' + userCreated.lastName,
         email: userCreated.email,
         bio: userCreated.bio,
         profile: userCreated.profile,
      });
   } catch (error) {
      console.log(error);
   }
};

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
         name: user.firstName + ' ' + user.lastName,
         email: user.email,
         bio: user.bio,
         profile: user.profile,
      });
   } else {
      res.status(400).json('Un authorized');
   }
};

//Todo: Update Profile

const updateUserProfile = async (req, res) => {
   const { firstName, lastName, email, password, bio } = req.body;

   if (!firstName && !lastName && !email && !password && !bio && !req.file) {
      return res.status(400).json('Provide some value to update');
   }

   const user = await userModel.findById(req.user._id);

   if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.bio = bio || user.bio;

      if (password) {
         user.password = bcrypt.genSalt(10, password) || user.password;
      }

      if (req.file) {
         const uploadedImage = await uploadToCloudinary(req.file);
         user.profile = uploadedImage || user.profile;
      }

      const userUpdated = await user.save();

      res.json({
         _id: userUpdated._id,
         name: userUpdated.firstName + ' ' + userUpdated.lastName,
         email: userUpdated.email,
         bio: userUpdated.bio,
         profile: userUpdated.profile,
      });
   } else {
      return res.status(400).json('User Not found');
   }
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

// Add a new controller function to search for users by name
const searchUsersByName = async (req, res) => {
   try {
      const { name } = req.query;
      const users = await userModel.find({
         $or: [
            { firstName: { $regex: name, $options: 'i' } },
            { lastName: { $regex: name, $options: 'i' } },
         ],
      });

      res.json(users);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
   }
};

export {
   login,
   logout,
   getUserProfile,
   updateUserProfile,
   findUser,
   createAccount,
   searchUsersByName,
};
