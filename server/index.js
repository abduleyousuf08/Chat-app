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

const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//*Routes Use
app.use('/auth', userRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);

app.get('/', (req, res) => {
   res.send('Hello iam from server side ');
});

server.listen(PORT, () => {
   console.log(`Server is running on: ${PORT}`);
});
