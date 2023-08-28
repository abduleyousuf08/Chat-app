import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema(
   {
      chatId: {
         type: String,
      },
      senderId: {
         type: String,
      },
      message: {
         type: String,
      },
   },
   {
      timestamps: true,
   }
);

const messageModel = mongoose.model('UserMessage', MessageSchema);

export default messageModel;
