import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomAlert from './CustomAlert';

function ChatDropDownList({
   setCurrentChat,
   currentChat,
   userChats,
   setUserChats,
}) {
   const [showCustomAlert, setShowCustomAlert] = useState(false);

   const toggleAlert = () => {
      setShowCustomAlert(!showCustomAlert);
   };

   const handleClick = (index) => {
      if (index === 0) {
         setCurrentChat(null);
      } else if (index === 1) {
         toggleAlert();
      }
   };

   const deleteChat = async () => {
      try {
         await axios.delete(`/chat/delete/${currentChat?._id}`);
         const nowChats = userChats.filter(
            (user) => user?.chat?._id !== currentChat?._id
         );
         setUserChats(nowChats);
         setCurrentChat(null);
         toast.success('Deleted successfully');
         toggleAlert();
      } catch (error) {
         console.log(error);
         toast.error(error.error || 'Try again ');
      }
   };

   return (
      <div className='absolute right-10 top-14 mt-4 bg-[#1a212d] z-40 py-2  text-white h-60 w-48 '>
         <ul className=''>
            <li
               className='cursor-pointer mb-4 hover:bg-[#96cae3] pl-2 hover:font-semibold py-1 px-2 '
               onClick={() => handleClick(0)}
            >
               Close chat
            </li>
            <li
               className='cursor-pointer mb-4 hover:bg-[#96cae3] pl-2 hover:font-semibold py-1 px-2 '
               onClick={() => handleClick(1)}
            >
               Delete chat
            </li>

            <li className=' cursor-pointer mb-4 hover:bg-[#96cae3] pl-2 hover:font-semibold py-1 px-2 '>
               Block
            </li>
            <li className=' cursor-pointer mb-4 hover:bg-[#96cae3] pl-2 hover:font-semibold py-1 px-2 '>
               Report
            </li>
         </ul>

         {showCustomAlert && (
            <CustomAlert
               title='Confirm Delete'
               message='Are you sure you want to delete this chat?'
               onConfirm={() => deleteChat()}
               onCancel={() => toggleAlert()}
            />
         )}
      </div>
   );
}

export default ChatDropDownList;
