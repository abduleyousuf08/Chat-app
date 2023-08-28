import e from 'express';
import { useSelector } from 'react-redux';

function MessageCard({ message }) {
   const { userInfo } = useSelector((state) => state.auth);

   return (
      <div
         className={
            message?.senderId === userInfo._id
               ? 'bg-[#1a212d]  max-w-sm mx-auto  p-4 ml-96 2xl:ml-[880px] mt-4  scale-90  border border-gray-300 rounded-lg '
               : 'bg-[#edf2f6]  max-w-sm mx-auto p-4 ml-6 mt-2  scale-90  border border-gray-300 rounded-lg  '
         }
      >
         <p
            className={
               message?.senderId === userInfo._id
                  ? 'text-white'
                  : 'text-[#1a212d]'
            }
         >
            {message?.message}
         </p>
         <p
            className={
               message?.senderId === userInfo._id
                  ? 'text-white text-sm text-end'
                  : 'text-white text-sm text-end'
            }
         >
            {message?.createdAt?.slice(12, 16)}
         </p>
      </div>
   );
}

export default MessageCard;
