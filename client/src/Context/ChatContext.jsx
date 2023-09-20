import { createContext, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ChatContext = createContext();

export function ChatContextProvider({ children }) {
   const { userInfo } = useSelector((state) => state.auth);

   //* STATES
   const [userChats, setUserChats] = useState([]);
   const [socket, setSocket] = useState(null);
   const [onlineUsers, setOnlineUsers] = useState([]);
   const [isUserChatLoading, setIsUserChatLoading] = useState(false);
   const [currentChat, setCurrentChat] = useState(null);
   const [messages, setMessages] = useState([]);
   const [isMessagesLoading, setIsMessagesLoading] = useState(false);
   const [newMessage, setNewMessage] = useState(null);
   const [isShowMyProfile, setIsShowMyProfile] = useState(false);
   const [isShowUserProfile, setIsShowUserProfile] = useState(false);
   const [showAddUser, setShowAddUser] = useState(false);
   const [newUsers, setNewUsers] = useState([]);
   const [newUserSearching, setNewUseSearching] = useState(false);
   const [notifications, setNotifications] = useState([]);

   //*Socket Implementations
   useEffect(() => {
      const newSocket = io('http://localhost:8000');
      setSocket(newSocket);

      return () => {
         newSocket.disconnect();
      };
   }, [userInfo]);

   useEffect(() => {
      if (socket === null) return;
      socket.emit('addNewUser', userInfo?._id);
      socket.on('getOnlineUsers', (res) => {
         setOnlineUsers(res);
      });

      return () => {
         socket.off('getOnlineUsers');
      };
   }, [userInfo, socket]);

   //Todo: Send messagew
   useEffect(() => {
      if (socket === null) return;

      const recipientId = currentChat?.members.find(
         (user) => user !== userInfo?._id
      );

      socket.emit('sendMessage', { ...newMessage, recipientId });
   }, [newMessage, socket, currentChat, userInfo]);

   //Todo: Recieve message and notifications
   useEffect(() => {
      if (socket === null) return;

      socket.on('getMessage', (res) => {
         if (currentChat?._id !== res.chatId) return;
         setMessages((prev) => [...prev, res]);

         const updatedUserChats = userChats.map((chat) => {
            if (chat?.chat?._id === res?.chatId) {
               // Update the lastMessage property if the chatId matches
               if (chat.lastMessage) {
                  chat.lastMessage.message = res.message;
                  chat.lastMessage._id = res._id;
               } else {
                  chat.lastMessage = {
                     message: res.message,
                  };
               }
            }
            return chat;
         });

         setUserChats(updatedUserChats);
      });

      socket.on('getNotifications', (res) => {
         const isChatOpen = currentChat?.members.some(
            (id) => id === res?.senderId
         );

         if (isChatOpen) {
            setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
         } else {
            setNotifications((prev) => [res, ...prev]);
            const updatedUserChats = userChats.map((chat) => {
               if (chat?.chat?._id === res?.chat) {
                  // Update the lastMessage property if the chatId matches
                  if (chat.lastMessage) {
                     chat.lastMessage.message = res.message;
                     chat.lastMessage._id = res._id;
                  } else {
                     chat.lastMessage = {
                        message: res.message,
                     };
                  }
               }
               return chat;
            });

            setUserChats(updatedUserChats);
         }
      });

      return () => {
         socket.off('getMessage');
         socket.off('getNotifications');
      };
   }, [socket, currentChat, userChats]);

   //*Logic implementatios

   useEffect(() => {
      const getUserChats = async () => {
         if (userInfo?._id) {
            setIsUserChatLoading(true);

            try {
               const res = await axios.get(
                  `/chat/find-my-chats/${userInfo._id}`
               );

               setUserChats(res.data.chats);
               setIsUserChatLoading(false);
            } catch (error) {
               console.error('Error fetching user chats:', error);
               setIsUserChatLoading(false);
            }
         }
      };

      getUserChats();
   }, [userInfo]);

   async function updateCurrentChat(chat) {
      if (!chat) {
         return console.log('There is no chat ');
      }

      setCurrentChat(chat);
   }

   useEffect(() => {
      async function getMessages() {
         if (currentChat) {
            setIsMessagesLoading(true);
            try {
               const res = await axios.get(
                  `/message/findMessage/${currentChat?._id}`
               );

               setMessages(res.data.data);
               setIsMessagesLoading(false);
            } catch (error) {
               console.log(error);
               setIsMessagesLoading(false);
            }
         }
      }

      getMessages();
   }, [currentChat]);

   function showProfile(type) {
      if (type === 'myProfile') {
         setIsShowMyProfile(!isShowMyProfile);
      } else if (type === 'userProfile') {
         setIsShowUserProfile(!isShowUserProfile);
      }
   }

   const sendMessage = async (text, currentChat) => {
      if (!text) return console.log('Provide some message');

      const res = await axios.post('/message/create', {
         messageNewOne: text,
         chatId: currentChat?._id,
      });

      const updatedUserChats = userChats.map((chat) => {
         if (chat.chat._id === res.data.data.chatId) {
            // Update the lastMessage property if the chatId matches
            if (chat.lastMessage) {
               chat.lastMessage.message = res.data.data.message;
               chat.lastMessage._id = res.data.data._id;
            } else {
               chat.lastMessage = {
                  message: res.data.data.message,
                  _id: res.data.data._id,
               };
            }
         }
         return chat;
      });

      setUserChats(updatedUserChats);

      setNewMessage(res.data.data);
      setMessages((prev) => [...prev, res.data.data]);
   };

   async function AddNewUsers(text) {
      if (!text) {
         return;
      }
      try {
         const res = await axios.get(`/auth/search?name=${text}`);
         setNewUsers(res.data);
      } catch (error) {
         console.log(error);

         setNewUseSearching(false);
      }
   }

   async function createChat(members) {
      if (!members) {
         return;
      }

      try {
         setIsUserChatLoading(true);
         const res = await axios.post(`/chat/create`, {
            members,
         });

         setUserChats((prev) => [...prev, res.data]);
         setIsUserChatLoading(false);
         toast.success('Chat created');
      } catch (error) {
         setIsUserChatLoading(false);
         toast.success(error.response.data || 'Chat error');
         console.log(error);
      }
   }

   const markThisUserNotificationsAsRead = useCallback(
      (thisUserNotifications, notifications) => {
         const mNotifications = notifications.map((el) => {
            let notification;

            thisUserNotifications.forEach((n) => {
               if (n.senderId === el.senderId) {
                  notification = {
                     ...n,
                     isRead: true,
                  };
               } else {
                  notification = el;
               }
            });
            return notification;
         });

         setNotifications(mNotifications);
      },
      []
   );

   return (
      <ChatContext.Provider
         value={{
            userChats, //*USED
            setUserChats,
            updateCurrentChat, //*USED
            messages, //*USED
            isMessagesLoading, //*USED
            isUserChatLoading, //*USED
            currentChat, //*USED
            showProfile, //*USED
            isShowUserProfile, //*USED
            isShowMyProfile, //*USED
            onlineUsers,
            sendMessage,
            setCurrentChat,
            setMessages,
            setShowAddUser,
            showAddUser,
            AddNewUsers,
            newUsers,
            newUserSearching,
            createChat,
            notifications,
            markThisUserNotificationsAsRead,
         }}
      >
         {children}
      </ChatContext.Provider>
   );
}
