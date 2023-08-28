import chatModel from '../model/chatModel.js';
import userModel from '../model/userModel.js';

// Todo: @CreateChat API
// ? Todo: @createChat ->  createChat using their id's memebers
// ? Todo: @createChat -> before creating i should check if there is existing chat in database same as them
// ? Todo: @createChat -> if there is ? returning their previous messages
// ? Todo: @createChat -> if there is not then checking if the memebers id's are same
// ? Todo: @createChat -> if they are same returning an error message
// ? Todo: @createChat -> else , savinng the chat to the databse with their id's
// Todo: @findMyChats API
// ? Todo: @findMyChats ->  searching if one of the memebers in chat model is same to the logged in user id
// ? Todo: @findMyChats -> if is it ? returing whole the chat because their chatted that memeber !
// Todo: @findChat API
// ? Todo: @findChat -> searching if the members in chat model is same to the logged in user id and the second id that logged in user clicks
// ? Todo: @findMyChats -> if is it ? returing whole the chat because they  chatted  !

async function createChat(req, res) {
   const memeber = req.body.members;
   const loggedInUser = req.user._id.toString();

   memeber.unshift(loggedInUser);

   const [firstId, secondId] = memeber;

   try {
      if (!firstId || !secondId) {
         return res.status(401).json('Members are required to create a chat');
      }

      if (firstId === secondId) {
         return res.status(401).json('Members id can not be same ');
      }

      const previousChat = await chatModel.find({
         members: { $all: [firstId, secondId] },
      });

      if (previousChat.length > 0) {
         return res.status(201).json(previousChat);
      }

      const user = await userModel
         .findOne({ _id: secondId })
         .select('-password');

      const chatCreated = await chatModel.create({
         members: memeber,
      });

      res.status(201).json({ chatCreated, user });
   } catch (error) {
      console.log(error);
      // res.status(400).json(error);
   }
}

async function findMyChats(req, res) {
   const id = req.params.id;

   try {
      const chats = await chatModel
         .find({ members: { $in: [id] } })
         .populate('chatMessages', 'message');

      res.status(200).json({ data: chats });
   } catch (error) {
      console.log(error);
   }
}

async function findChat(req, res) {
   const { _id } = req.user;
   const { secondId } = req.params;

   const id = _id.toString(); //Todo: covention of id's type to string

   try {
      const chats = await chatModel
         .find({ members: { $all: [id, secondId] } })
         .populate('chatMessages');
      if (chats) {
         res.status(200).json(chats);
         console.log(chats);
      } else {
         res.status(400).json('No chats');
      }
   } catch (error) {
      console.log(error);
   }
}

export { createChat, findChat, findMyChats };
