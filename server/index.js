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
const io = new Server(8090, {
   cors: '*',
});

//Todo:express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Todo: Routes of our API
app.use('/auth', userRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);

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
