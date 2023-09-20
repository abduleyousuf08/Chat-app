import React from 'react';

function ChatLoader() {
   return (
      <div className='flex justify-between items-center py-2 px-2 animate-pulse'>
         <div className='flex items-center'>
            <div className='w-10 h-10 bg-gray-300 rounded-full'></div>{' '}
            <div>
               <div className='ml-2 w-28 h-3 bg-gray-300 rounded'></div>{' '}
            </div>
         </div>

         <div className='flex items-center'>
            <div className='w-6 h-6 bg-gray-300 rounded-full'></div>{' '}
            <div className='w-6 h-6 ml-3 bg-gray-300 rounded-full'></div>{' '}
            <div className='w-6 h-6 ml-3 bg-gray-300 rounded-full'></div>{' '}
         </div>
      </div>
   );
}

export default ChatLoader;
