import messageModel from '../model/messageModel.js';

// Todo: @createMessage API
// ? Todo: @createMessage ->  Creating message and saving in to the database
// ? Todo: @createMessage -> if there is no chatId or logged In user which will be the sender ? !
// ? Todo: @createMessage -> returing an error
// Todo: @Find message API
// ? Todo: @findMessage -> Finding a messages for a specific chat using to find a chatId
// ? Todo: @findMyChats -> if there is no previous value , returing start now string value

async function createMessage(req, res) {
   const { chatId, messageNewOne } = req.body;
   const { _id } = req.user;
   const senderId = _id.toString(); //Todo: covention of id's type to string

   try {
      if (!chatId) {
         return res.status(400).json('Error occured at sending message');
      }

      if (messageNewOne?.trim().length === '') {
         return res.status(400).json('write some message');
      }

      const message = await messageModel.create({
         chatId,
         message: messageNewOne,
         senderId,
      });

      res.status(200).json({ data: message });
   } catch (error) {
      console.log(error);
   }
}

async function findMessages(req, res) {
   const { chatId } = req.params;

   try {
      if (!chatId) {
         return res.status(400).json('Chat Id is required');
      }

      const messages = await messageModel.find({ chatId });

      if (!messages) {
         return res.status(400).json('Start Chating now ');
      } else {
         return res.status(200).json({ data: messages });
      }
   } catch (error) {
      console.log(error);
   }
}

async function deleteMessages(req, res) {
   const chatId = req.params.id;
   try {
      if (!chatId) {
         return res.status(400).json('Provide the chatId');
      }
      await messageModel.deleteMany({ chatId: chatId });
      res.status(200).json('Messages are deleted');
   } catch (error) {
      console.log(error);
      res.status(400).json('Couldn"t delete messages');
   }
}

export { createMessage, findMessages, deleteMessages };
