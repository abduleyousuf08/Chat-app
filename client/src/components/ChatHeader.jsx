import { IoIosCall } from 'react-icons/io';

import { GoSearch } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';

//? COMPONENTS
import Avatar from '../components/Avatar';

function ChatHeader({ userData }) {
   return (
      <div>
         <div className='flex justify-between items-center  py-2 px-2'>
            <div className='flex items-center'>
               <Avatar image={userData?.data?.profile} />
               <p className='ml-2 font-userName'>{userData?.data?.name}</p>
            </div>

            <div className='flex items-center'>
               <GoSearch size={22} className='cursor-pointer' />
               <IoIosCall size={22} className='ml-3 cursor-pointer' />
               <BsThreeDotsVertical size={22} className='ml-3 cursor-pointer' />
            </div>
         </div>
         <p className='border  border-gray-200 mt-4 mb-4 mr-2'></p>
      </div>
   );
}

export default ChatHeader;
