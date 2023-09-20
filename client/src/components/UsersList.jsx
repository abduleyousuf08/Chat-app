import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';

//? COMPONENTS
import UserItem from './UserItem';
import UsersHeader from './UsersHeader';
import SearchBar from './SearchBar';
import Loader from './Loader';

function UsersList() {
   const { userChats, isUserChatLoading, isShowUserProfile, isShowMyProfile } =
      useContext(ChatContext);

   return (
      <div
         className={
            isShowMyProfile || isShowUserProfile
               ? 'relative  h-screen overflow-y-scroll overflow-x-hidden  w-2/5 2xl:w-1/3 px-2 mr-2 '
               : 'relative  h-screen overflow-y-scroll overflow-x-hidden  w-2/5 2xl:w-1/3 px-2 mr-2 '
         }
      >
         <UsersHeader />
         <SearchBar />

         {isUserChatLoading ? (
            <Loader />
         ) : (
            userChats?.map((chat) => (
               <UserItem chat={chat} key={chat?.chat?._id} />
            ))
         )}
      </div>
   );
}

export default UsersList;
