import '../App.css';
import { useFindMyChatQuery } from '../Slices/chatApiSlice';
import { useFindMessageQuery } from '../Slices/messageApiSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

//? COMPONENTS
import Chat from '../components/Chat';
import SideBar from '../components/SideBar';
import UsersList from '../components/UsersList';

function ChatApp() {
   const [chat, setChat] = useState('');
   const [userData, setUserData] = useState('');
   const { userInfo } = useSelector((state) => state.auth);

   function getChatId(chat, data) {
      setUserData(data);
      setChat(chat);
   }
   const { data, isLoading, isError } = useFindMyChatQuery(userInfo._id);
   const {
      data: messages,
      isLoading: loading,
      isError: error,
   } = useFindMessageQuery(chat._id);

   if (isLoading) {
      return <div>Loading....</div>;
   } else if (isError) {
      return <div>Error</div>;
   }

   if (loading) {
      return <div>Loading....</div>;
   } else if (error) {
      return <div>Error</div>;
   }

   return (
      <div className='flex'>
         <SideBar />
         <UsersList data={data} getChatId={getChatId} />
         <p className='border pl-0 border-l-gray-200  '></p>
         <Chat messages={messages} userData={userData} />
      </div>
   );
}

export default ChatApp;
