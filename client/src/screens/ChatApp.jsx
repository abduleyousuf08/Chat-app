import '../App.css';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../Context/ChatContext';
import axios from 'axios';
import { useSelector } from 'react-redux';

//? COMPONENTS
import Chat from '../components/Chat';
import SideBar from '../components/SideBar';
import UsersList from '../components/UsersList';
import Profile from '../components/Profile';
import ShowMyProfile from '../components/showMyProfile';
import NewUserList from '../components/NewUserList';

//
function ChatApp() {
   const { userInfo } = useSelector((state) => state.auth);
   const { isShowUserProfile, isShowMyProfile, currentChat, showAddUser } =
      useContext(ChatContext);
   const [userData, setUserData] = useState(null);
   const [isUserDataLoading, setIsUserDataLoading] = useState(false);

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
      <div className='flex'>
         <SideBar />
         {showAddUser ? <NewUserList /> : <UsersList />}

         <p className='border pl-0 border-l-gray-200  '></p>
         <Chat />
         <p className='border pl-0 border-r-gray-200  '></p>
         {isShowUserProfile && !isUserDataLoading ? (
            <Profile userData={userData} />
         ) : (
            isShowMyProfile && <ShowMyProfile />
         )}
      </div>
   );
}

export default ChatApp;
