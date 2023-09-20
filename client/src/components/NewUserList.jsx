import React, { useContext, useEffect } from 'react';

import NewUserItem from './NewUserItem';
import NewUserSearchBar from './NewUserSearchBar';
import NewUserHeader from './NewUserHeader';
import { ChatContext } from '../Context/ChatContext';

function NewUserList() {
   const {
      isShowUserProfile,
      isShowMyProfile,
      newUsers,
      createChat,

      setShowAddUser,
   } = useContext(ChatContext);

   useEffect(() => {
      const handleClickOutside = (event) => {
         const newUserList = document.getElementById('newUserList');
         if (newUserList && !newUserList.contains(event.target)) {
            setShowAddUser(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [setShowAddUser]);

   return (
      <div
         id='newUserList'
         className={
            isShowMyProfile || isShowUserProfile
               ? 'relative  h-screen overflow-y-scroll overflow-x-hidden  w-1/2 2xl:w-1/3 px-2 mr-2 '
               : 'relative  h-screen overflow-y-scroll overflow-x-hidden  w-2/5 2xl:w-1/3 px-2 mr-2 '
         }
      >
         <NewUserHeader />
         <NewUserSearchBar />
         {newUsers &&
            newUsers.map((user) => (
               <NewUserItem
                  user={user}
                  createChat={createChat}
                  key={user._id}
               />
            ))}
      </div>
   );
}

export default NewUserList;
