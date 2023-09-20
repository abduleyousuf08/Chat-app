import { GrFormClose } from 'react-icons/gr';
import { MdBlockFlipped } from 'react-icons/md';
import { SlDislike } from 'react-icons/sl';
import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';

//*COMPONENTS
import Avatar from './Avatar';

function Profile({ userData }) {
   const { showProfile } = useContext(ChatContext);

   function handleCloseProfile() {
      showProfile('userProfile');
   }
   return (
      <>
         <div className='flex flex-col w-1/2 ml-2'>
            <div className='p-2'>
               <div className='flex justify-between items-center pb-2'>
                  <h1 className='text-2xl font-uls'>Profile</h1>
                  <GrFormClose
                     size={28}
                     className='cursor-pointer'
                     onClick={handleCloseProfile}
                  />
               </div>
               <p className='border pl-0 border-gray-200 mt-1  mr-2'></p>
               <div className='flex flex-col justify-center items-center mt-4 mb-4 2xl:mt-20 2xl:mb-14'>
                  <Avatar width={100} image={userData?.profile} />
                  <p className='font-userName mt-2'>
                     {' '}
                     {userData?.firstName + '  ' + userData?.lastName}
                  </p>
               </div>
               <h1 className='font-uls text-xl'>Bio</h1>
               <p className='mb-4'>{userData?.bio}</p>
               <p className='border pl-0 border-gray-200 mt-1  2xl:mt-10  mr-2'></p>
            </div>
            <div>
               <ul className='ml-2 '>
                  <li className='mb-4 2xl:mb-4 cursor-pointer  py-2 px-2  '>
                     Starred messages
                  </li>
                  <li className='mb-4 2xl:mb-4 cursor-pointer  py-2 px-2 '>
                     Clear chat
                  </li>
                  <li className='mb-4 2xl:mb-4 cursor-pointer  py-2 px-2 '>
                     Mute notifications
                  </li>
               </ul>
               <p className='border pl-0 border-gray-200 mt-1 2xl:mt-8  mr-2'></p>
               <ul className='ml-2 mt-2 2xl:mt-4 text-red-600 font-bold'>
                  <li className='flex items-center mb-4 2xl:mb-4 cursor-pointer hover:bg-gray-300 py-2 px-2 '>
                     <MdBlockFlipped className='mr-2' size={23} />
                     Block
                  </li>
                  <li className='flex items-center mb-4 2xl:mb-4 cursor-pointer hover:bg-gray-300 py-2 px-2 '>
                     <SlDislike className='mr-2' size={23} />
                     Report
                     <span className='font-userName ml-2'>
                        {userData?.firstName}
                     </span>
                  </li>
               </ul>
            </div>
         </div>
      </>
   );
}

export default Profile;
