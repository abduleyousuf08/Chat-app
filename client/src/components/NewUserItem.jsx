import React from 'react';
import { GrInfo } from 'react-icons/gr';

import Avatar from './Avatar';

function NewUserItem({ user, createChat }) {
   function handleCreateChat() {
      createChat([user?._id]);
   }
   return (
      <div className='relative w-96  ml-0 py-2 px-2 scale-90 cursor-pointer border border-gray-300'>
         <div className='flex items-center justify-between'>
            <div className='flex items-center'>
               <Avatar image={user?.profile} />
               <h1 className='ml-2 font-userName '>
                  {user?.firstName + '  ' + user?.lastName}
               </h1>
            </div>
         </div>

         <p className='flex items-center mt-6 ml-2 truncate'>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               viewBox='0 0 24 24'
               fill='currentColor'
               className='w-6 h-6 mr-4'
            >
               <path d='M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z' />
               <path
                  fillRule='evenodd'
                  d='M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z'
                  clipRule='evenodd'
               />
            </svg>
            Joined
            {'  ' + user.createdAt.slice(0, 7)}
         </p>
         <p className='flex items-center mt-6 ml-2 truncate'>
            <GrInfo className='mr-4' size={20} />
            {user.bio}
         </p>
         <button
            className='border border-gray-200 py-3 px-2 w-60  mt-8 font-messages  rounded bg-[#1a212d] text-[#96cae3] font-semibold active:bg-[#96cae3] active:text-[#1a212d] active:font-bold'
            onClick={handleCreateChat}
         >
            Create chat
         </button>
      </div>
   );
}

export default NewUserItem;
