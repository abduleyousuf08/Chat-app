import mongoose from 'mongoose';

const ChatSchema = mongoose.Schema(
   {
      members: {
         type: Array,
      },

      chatMessages: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserMessage',
         },
      ],
   },
   {
      timestamps: true,
   }
);

const chatModel = mongoose.model('Chat', ChatSchema);

export default chatModel;
