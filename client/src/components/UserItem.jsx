import { useSelector } from 'react-redux';
import { unreadNotificationsFunc } from '../utils/unreadNotifications';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

//* COMPONENTS
import Avatar from './Avatar';
import { ChatContext } from '../Context/ChatContext';
import Loader from '../components/Loader';

function UserItem({ chat }) {
   const {
      updateCurrentChat,
      onlineUsers,
      notifications,
      markThisUserNotificationsAsRead,
   } = useContext(ChatContext);
   const [userData, setUserData] = useState(null);
   const [isUserDataLoading, setIsUserDataLoading] = useState(false);
   const { userInfo } = useSelector((state) => state.auth);

   const unreadNotifications = unreadNotificationsFunc(notifications);

   const freindId = chat?.chat?.members.find(
      (friend) => friend !== userInfo?._id
   );
   const thisUserNotifications = unreadNotifications?.filter(
      (n) => n.senderId === freindId
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
   }, [freindId]);

   if (isUserDataLoading) {
      return <Loader />;
   }

   function handleThisChatsOperations() {
      updateCurrentChat(chat?.chat);
      if (thisUserNotifications.length !== 0) {
         markThisUserNotificationsAsRead(thisUserNotifications, notifications);
      }
   }

   return (
      <div
         className='relative w-60  ml-4 py-2 px-2 scale-90 cursor-pointer '
         onClick={handleThisChatsOperations}
      >
         <div className='flex items-center justify-between'>
            <div className='flex items-center'>
               <Avatar image={userData?.profile} />
               <h1 className='ml-2 font-userName '>
                  {userData?.firstName + ' ' + userData?.lastName}
               </h1>
            </div>

            {thisUserNotifications?.length > 0 ? (
               <span className='mt-6 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs'>
                  {thisUserNotifications?.length > 0
                     ? thisUserNotifications?.length
                     : ''}
               </span>
            ) : (
               ' '
            )}
         </div>

         <p className='mt-3 ml-6 truncate'>{chat?.lastMessage?.message}</p>
         <p className='border pl-0 border-gray-200 mt-2  mr-2'></p>
         {onlineUsers?.some((user) => user.userId === userData?._id) && (
            <span className='absolute top-1 left-12'>
               <span className='inline-block w-4 h-4 bg-green-500 rounded-full'></span>
               <span className='ml-1 text-green-500'></span>
            </span>
         )}
      </div>
   );
}

export default UserItem;
