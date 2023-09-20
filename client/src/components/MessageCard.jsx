import { useSelector } from 'react-redux';

function MessageCard({ message, isShowUserProfile, isShowMyProfile }) {
   const { userInfo } = useSelector((state) => state.auth);

   return (
      <div
         className={
            message?.senderId === userInfo._id && isShowMyProfile
               ? 'bg-[#1a212d]  max-w-xs mx-auto 2xl:mx-20 p-4 ml-72 2xl:ml-[520px] mt-4  scale-90  border border-gray-300 rounded-lg'
               : message?.senderId === userInfo._id && isShowUserProfile
               ? 'bg-[#1a212d]  max-w-xs mx-auto 2xl:mx-20 p-4 ml-72 2xl:ml-[520px] mt-4  scale-90  border border-gray-300 rounded-lg'
               : message?.senderId === userInfo._id
               ? 'bg-[#1a212d]  max-w-xs mx-auto 2xl:mx-20 p-4 ml-96 2xl:ml-[820px] mt-4  scale-90  border border-gray-300 rounded-lg'
               : 'bg-[#edf2f6]  max-w-xs mx-auto 2xl:mx-20 p-4 ml-6 2xl:ml-[20px] mt-4  scale-90  border border-gray-300 rounded-lg'
         }
      >
         <p
            className={
               message?.senderId === userInfo?._id
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
                  : 'text-black text-sm text-end'
            }
         >
            {message?.createdAt?.slice(12, 16)}
         </p>
      </div>
   );
}

export default MessageCard;
