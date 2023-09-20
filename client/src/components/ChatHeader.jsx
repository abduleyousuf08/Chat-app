import { useState, useEffect, useRef } from 'react';
import { IoIosCall } from 'react-icons/io';
import { GoSearch } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';

//? COMPONENTS
import Avatar from '../components/Avatar';
import ChatDropDownList from './ChatDropDownList';

function ChatHeader({
   userData,
   showProfile,
   onlineUsers,
   currentChat,
   setCurrentChat,
   setUserChats,
   userChats,
}) {
   const [listShow, setListShow] = useState(false);
   const dropdownRef = useRef(null);

   let isOnline = onlineUsers?.some((user) => user.userId === userData?._id);

   useEffect(() => {
      function handleClickOutside(event) {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setListShow(false);
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
         document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   return (
      <div className='flex justify-between items-center  py-2 px-2'>
         <div className='flex items-center'>
            <div onClick={() => showProfile('userProfile')}>
               <Avatar image={userData?.profile} />
            </div>
            <div>
               <p className=' ml-2 font-userName'>
                  {userData?.firstName + ' ' + userData?.lastName}
               </p>
               <p className='flex items-center ml-2 text-sm  text-gray-500'>
                  <span className='relative flex h-3 w-3 mr-1'>
                     <span
                        className={
                           isOnline
                              ? 'animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'
                              : ' absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'
                        }
                     ></span>
                     <span
                        className={
                           isOnline
                              ? 'relative inline-flex rounded-full h-3 w-3 bg-sky-500'
                              : 'relative inline-flex rounded-full h-3 w-3 bg-red-500'
                        }
                     ></span>
                  </span>
                  {isOnline ? 'Online' : 'offline'}
               </p>
            </div>
         </div>

         <div className='flex items-center'>
            <GoSearch size={22} className='cursor-pointer' />
            <IoIosCall size={22} className='ml-3 cursor-pointer' />
            <div ref={dropdownRef}>
               <BsThreeDotsVertical
                  size={22}
                  className='ml-3 cursor-pointer'
                  onClick={() => setListShow(!listShow)}
               />
               {listShow && (
                  <ChatDropDownList
                     setCurrentChat={setCurrentChat}
                     currentChat={currentChat}
                     userChats={userChats}
                     setUserChats={setUserChats}
                     setListShow={setListShow}
                  />
               )}
            </div>
         </div>
      </div>
   );
}

export default ChatHeader;
