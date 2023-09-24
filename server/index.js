import path from 'path';

import connectDB from './db.config.js';

import express from 'express';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

import { createServer } from 'http';
import { Server } from 'socket.io';

import cors from 'cors';

const PORT = 5000 || 8000;

connectDB();

//*ROUTES
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

const app = express();
app.use(cors());

//Todo: set uping the socket io server and express server
const server = createServer(app);

//Todo:express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Todo: Routes of our API
app.use('/auth', userRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);

const io = new Server({
   cors: '*',
});

let onlineUsers = [];

io.on('connection', (socket) => {
   console.log('User connected' + socket.id);

   //? LISTEN TO A CONNECTION
   socket.on('addNewUser', (userId) => {
      !onlineUsers.some((user) => user.userId === userId) &&
         onlineUsers.push({
            userId,
            socketId: socket.id,
         });

      io.emit('getOnlineUsers', onlineUsers);
   });

   //? Send Message
   socket.on('sendMessage', (message) => {
      const userToSend = onlineUsers.find(
         (user) => user.userId === message.recipientId
      );

      if (userToSend) {
         io.to(userToSend.socketId).emit('getMessage', message);
         io.to(userToSend.socketId).emit('getNotifications', {
            chat: message.chatId,
            senderId: message.senderId,
            message: message.message,
            isRead: false,
            date: new Date(Date.now()),
         });
      }
   });

   //Disconnecting user and removing from the online users
   socket.on('disconnect', () => {
      console.log('user discounted' + socket.id);
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      io.emit('getOnlineUsers', onlineUsers);
   });
});

io.listen(8000);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
   //set static folder
   app.use(express.static(path.join(__dirname, '/client/build')));

   //any route that is not API will be redirected to index.html
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
} else {
   app.get('/', (req, res) => {
      res.send('api is running....');
   });
}

server.listen(PORT, () => {
   console.log(`Server is running on: ${PORT}`);
});
