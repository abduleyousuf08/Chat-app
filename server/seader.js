import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import User from './model/userModel.js';
import connectDB from './db.config.js';

dotenv.config();

connectDB();

const importData = async () => {
   try {
      await User.deleteMany();

      const createdUsers = await User.insertMany(users);

      console.log('Data Imported!'.green.inverse);
      process.exit();
   } catch (error) {
      console.error(`${error}`.red.inverse);
      process.exit(1);
   }
};

const destroyData = async () => {
   try {
      await User.deleteMany();

      console.log('Data Destroyed!'.red.inverse);
      process.exit();
   } catch (error) {
      console.error(`${error}`.red.inverse);
      process.exit(1);
   }
};

if (process.argv[2] === '-d') {
   destroyData();
} else {
   importData();
}
