import { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { ChatContext } from '../Context/ChatContext';

//? COMPONENTS
import ChatWindow from './ChatWindow';
import ChatHeader from './ChatHeader';
import StartChat from './StartChat';
import ChatLoader from './ChatLoader';
import DefaultWindowChat from './DefaultWindowChat';

function Chat() {
   const {
      messages,
      currentChat,
      showProfile,
      onlineUsers,
      setCurrentChat,
      userChats,
      setUserChats,
   } = useContext(ChatContext);
   const { userInfo } = useSelector((state) => state.auth);
   const [userData, setUserData] = useState(null);
   const [isUserDataLoading, setIsUserDataLoading] = useState(false);
   const scroll = useRef();

   const freindId = currentChat?.members.find(
      (friend) => friend !== userInfo?._id
   );

   useEffect(() => {
      async function getUserData() {
         if (freindId) {
            setIsUserDataLoading(true);
            try {
               const res = await axios.get(`/auth/users/${freindId}`);
               setUserData(res.data.data);
               setIsUserDataLoading(false);
            } catch (error) {
               console.log(error);
               setIsUserDataLoading(false);
            }
         }
      }

      getUserData();
   }, [freindId, currentChat]);

   return (
      <div className='flex flex-col justify-between px-2 py-4 w-screen'>
         <div ref={scroll}>
            {!currentChat ? (
               <DefaultWindowChat />
            ) : (
               <>
                  {isUserDataLoading ? (
                     <ChatLoader />
                  ) : (
                     <ChatHeader
                        userData={userData}
                        showProfile={showProfile}
                        onlineUsers={onlineUsers}
                        currentChat={currentChat}
                        setCurrentChat={setCurrentChat}
                        userChats={userChats}
                        setUserChats={setUserChats}
                     />
                  )}
                  <p className='border pl-0 border-gray-200 mt-2  mr-2'></p>
                  {messages.length === undefined ? (
                     <StartChat />
                  ) : (
                     <ChatWindow />
                  )}
               </>
            )}
         </div>
      </div>
   );
}

export default Chat;
