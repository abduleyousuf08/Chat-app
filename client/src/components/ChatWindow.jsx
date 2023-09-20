import { IoIosArrowForward } from 'react-icons/io';
import InputEmoji from 'react-input-emoji';
import { useContext, useState } from 'react';
import { ChatContext } from '../Context/ChatContext';

//*COMPONENTS
import MessageLoader from './MessageLoader';
import MessageCard from './MessageCard';

function ChatWindow() {
   const {
      messages,
      isMessagesLoading,
      sendMessage,
      currentChat,
      isShowUserProfile,
      isShowMyProfile,
   } = useContext(ChatContext);
   const [text, setText] = useState('');

   function sentNewMessage() {
      if (text === ' ') {
         return alert('Write some message to send ');
      }
      sendMessage(text, currentChat);
      setText(' ');
   }

   return (
      <div>
         <>
            <div
               className={
                  'py-3 overflow-y-scroll overflow-x-hidden h-72 2xl:h-[600px]'
               }
            >
               {isMessagesLoading ? (
                  <MessageLoader />
               ) : (
                  messages?.map((message) => (
                     <MessageCard
                        message={message}
                        key={message?.createdAt}
                        isShowUserProfile={isShowUserProfile}
                        isShowMyProfile={isShowMyProfile}
                     />
                  ))
               )}
            </div>
            <div className='flex h-20 border-2 mt-32 2xl:mt-32 '>
               <InputEmoji
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  onEnter={sentNewMessage}
                  borderColor='#fff'
                  shouldReturn={true}
                  placeholder='Type a message'
               />

               <button
                  className='flex items-center  border border-gray-300 py-1 px-3 bg-[#4BAED0] text-white h-10 mt-6 mr-2 '
                  onClick={sentNewMessage}
               >
                  Send <IoIosArrowForward className='ml-2' />
               </button>
            </div>
         </>
      </div>
   );
}

export default ChatWindow;
