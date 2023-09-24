const { Server } = require('socket.io');

const io = new Server({
   cors: 'http://localhost:3000',
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
