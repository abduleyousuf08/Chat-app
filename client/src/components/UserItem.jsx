import { useSelector } from 'react-redux';
import { useGetUserDetailsQuery } from '../Slices/userApiSlice';
import { useFindMessageQuery } from '../Slices/messageApiSlice';

//* COMPONENTS

import Avatar from './Avatar';
import Loader from './Loader';

function UserItem({ chat, getChatId, index }) {
   //

   const { userInfo } = useSelector((state) => state.auth);
   const date = new Date(Date.now()).getMinutes() + ' Min Ago';

   const id = chat.members.find((member) => userInfo._id !== member);

   const { data, isLoading, isError } = useGetUserDetailsQuery(id);

   const {
      data: messages,
      isLoading: loading,
      isError: error,
   } = useFindMessageQuery(chat._id);

   function handleUserClicked() {
      getChatId(chat, data);
   }

   if (loading) {
      return <Loader />;
   } else if (error) {
      return <div>Error....</div>;
   }

   if (isLoading) {
      return <Loader />;
   } else if (isError) {
      return <div>Error</div>;
   }

   //TODO: selecting the last message of the array
   const lastMessage = messages.data[messages.data.length - 1];

   return (
      <div
         className='w-78  ml-4 py-2 px-2 scale-90 cursor-pointer '
         onClick={() => handleUserClicked(index)}
      >
         <div className='flex items-center justify-between'>
            <div className='flex items-center'>
               <Avatar image={''} />
               <h1 className='ml-2 font-userName '>{data.data.name}</h1>
            </div>
            <p className='text-sm'>{date}</p>
         </div>

         <p className='mt-1 ml-6'>{lastMessage ? lastMessage.message : ' '}</p>
         <p className='border pl-0 border-gray-200 mt-2  mr-2'></p>
      </div>
   );
}

export default UserItem;
