import logo4 from '../assets/logo4.png';
import { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChatContext } from '../Context/ChatContext';

//* ICONS
import { BiMessageSquareDetail } from 'react-icons/bi';
import { MdGroup } from 'react-icons/md';
import { Archive } from 'react-feather';
import StatusIcon from '../components/StatusIcon';
import { FiPhoneCall } from 'react-icons/fi';
import { GoPersonAdd } from 'react-icons/go';
function SideBar() {
   const {
      showProfile,
      isShowUserProfile,
      isShowMyProfile,
      setShowAddUser,
      showAddUser,
      userChats,
   } = useContext(ChatContext);

   const liRefs = useRef([]);

   const handleClick = (index) => {
      //* Show profile section
      if (index === 6) {
         showProfile('myProfile');
      }

      if (index === 0) {
         setShowAddUser(false);
      }

      if (index === 0) {
         return;
      }

      if (index === 7) {
         setShowAddUser(!showAddUser);
      }

      liRefs.current.forEach((liRef, i) => {
         if (i === index) {
            liRef.classList.add(
               'bg-[#96cae3]',
               'text-white',
               'py-1',
               'px-2',
               'w-40',
               'rounded-md'
            ); // Add your active style class here
            const spanElement = liRef.querySelector('.notification-span'); // Get the span element
            if (spanElement) {
               spanElement.classList.add(
                  'text-white',
                  'bg-[#96cae3]',
                  'border-none',
                  'font-semibold'
               );
            }
         } else {
            liRef.classList.remove(
               'bg-[#96cae3]',
               'text-black',
               'py-1',
               'px-2'
            );
            const spanElement = liRef.querySelector('.notification-span'); // Get the span element
            if (spanElement) {
               spanElement.classList.remove(
                  'text-white',
                  'bg-[#96cae3]',
                  'border-none',
                  'font-semibold'
               );
            }
         }
      });
   };

   useEffect(() => {
      const handleDocumentClick = (event) => {
         const clickedInsideList = liRefs.current.some((liRef) =>
            liRef.contains(event.target)
         );

         if (!clickedInsideList) {
            //* Reset active styles for list items here
            liRefs.current.forEach((liRef) => {
               liRef.classList.remove(
                  'bg-[#96cae3]',
                  'text-white',
                  'py-1',
                  'px-2',
                  'w-40',
                  'rounded-md'
               );
               const spanElement = liRef.querySelector('.notification-span'); // Get the span element
               if (spanElement) {
                  spanElement.classList.remove(
                     'text-white',
                     'bg-[#96cae3]',
                     'border-none',
                     'font-semibold'
                  );
               }
            });
         }
      };

      document.addEventListener('click', handleDocumentClick);

      return () => {
         document.removeEventListener('click', handleDocumentClick);
      };
   }, []);

   return (
      <div
         className={
            isShowMyProfile || isShowUserProfile
               ? 'bg-[#1a212d] inline-block text-white h-screen w-52 overflow-y-scroll  overflow-x-hidden '
               : 'bg-[#1a212d] inline-block text-white h-screen w-80 overflow-y-scroll  overflow-x-hidden '
         }
      >
         <Link to='/'>
            <img src={logo4} alt='' width={80} className='2xl:mt-4 ' />
         </Link>

         <div className='pl-8 mt-10 2xl:mt-20'>
            {isShowUserProfile || isShowMyProfile ? (
               <>
                  <ul className='mb-6'>
                     <li
                        className='mb-4 cursor-pointer'
                        ref={(element) => (liRefs.current[0] = element)}
                        onClick={() => handleClick(0)}
                     >
                        <BiMessageSquareDetail size={24} />
                     </li>
                     <li
                        className='mb-4 cursor-pointer'
                        ref={(element) => (liRefs.current[1] = element)}
                        onClick={() => handleClick(1)}
                     >
                        <MdGroup size={24} />
                     </li>
                  </ul>
                  <p className='border pl-0 border-gray-300 mt-4 mb-4 mr-2'></p>
               </>
            ) : (
               <>
                  <ul className='mb-6'>
                     <li
                        className='mb-4 cursor-pointer'
                        ref={(element) => (liRefs.current[0] = element)}
                        onClick={() => handleClick(0)}
                     >
                        My chats
                        <span className='bg-black py-1 px-1 ml-4 text-xs rounded-lg   notification-span'>
                           {userChats.length}
                        </span>
                     </li>
                     <li
                        className='mb-4 cursor-pointer'
                        ref={(element) => (liRefs.current[1] = element)}
                        onClick={() => handleClick(1)}
                     >
                        Group
                     </li>
                  </ul>
                  <p className='border pl-0 border-gray-300 mt-4 mb-4 mr-2'></p>
               </>
            )}

            {isShowMyProfile || isShowUserProfile ? (
               <>
                  <ul className='mb-6'>
                     <li
                        className='mb-4 cursor-pointer'
                        ref={(element) => (liRefs.current[2] = element)}
                        onClick={() => handleClick(2)}
                     >
                        <StatusIcon />
                     </li>
                     <li
                        className='mb-4 cursor-pointer'
                        ref={(element) => (liRefs.current[3] = element)}
                        onClick={() => handleClick(3)}
                     >
                        {' '}
                        <Archive size={23} />
                     </li>
                  </ul>

                  <p className='border pl-0 border-gray-300 mt-4 mb-2 mr-2'></p>
               </>
            ) : (
               <>
                  <ul className='mb-6'>
                     <li
                        className='mb-4 cursor-pointer'
                        ref={(element) => (liRefs.current[2] = element)}
                        onClick={() => handleClick(2)}
                     >
                        Story
                     </li>
                     <li
                        className='mb-4 cursor-pointer'
                        ref={(element) => (liRefs.current[3] = element)}
                        onClick={() => handleClick(3)}
                     >
                        {' '}
                        Archive
                     </li>
                  </ul>

                  <p className='border pl-0 border-gray-300 mt-4 mb-2 mr-2'></p>
               </>
            )}
            {isShowMyProfile || isShowUserProfile ? (
               <>
                  <ul className='mb-36 2xl:mb-96'>
                     <li
                        className='mb-4 cursor-pointer'
                        ref={(element) => (liRefs.current[4] = element)}
                        onClick={() => handleClick(4)}
                     >
                        <FiPhoneCall size={24} />
                     </li>
                     <li
                        className='mt-6 cursor-pointer'
                        ref={(element) => (liRefs.current[7] = element)}
                        onClick={() => handleClick(7)}
                     >
                        <GoPersonAdd size={24} />
                     </li>
                  </ul>
               </>
            ) : (
               <>
                  <ul className='mb-36 2xl:mb-96'>
                     <li
                        className='mb-4 cursor-pointer'
                        ref={(element) => (liRefs.current[4] = element)}
                        onClick={() => handleClick(4)}
                     >
                        Call
                     </li>
                     <li
                        className='mb-4 cursor-pointer'
                        ref={(element) => (liRefs.current[7] = element)}
                        onClick={() => handleClick(7)}
                     >
                        Create chat
                     </li>
                  </ul>
               </>
            )}

            {isShowMyProfile || isShowUserProfile ? (
               <>
                  <ul>
                     <li
                        className='mb-4 cursor-pointer '
                        ref={(element) => (liRefs.current[5] = element)}
                        onClick={() => handleClick(5)}
                     >
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           fill='none'
                           viewBox='0 0 24 24'
                           strokeWidth={1.5}
                           stroke='currentColor'
                           className='w-6 h-6'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z'
                           />
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                           />
                        </svg>
                     </li>
                     <li
                        className='cursor-pointer'
                        ref={(element) => (liRefs.current[6] = element)}
                        onClick={() => {
                           handleClick(6);
                        }}
                     >
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           fill='none'
                           viewBox='0 0 24 24'
                           strokeWidth={1.5}
                           stroke='currentColor'
                           className='w-6 h-6'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                           />
                        </svg>
                     </li>
                  </ul>
               </>
            ) : (
               <>
                  <ul>
                     <li
                        className='mb-4 cursor-pointer '
                        ref={(element) => (liRefs.current[5] = element)}
                        onClick={() => handleClick(5)}
                     >
                        Settings
                     </li>
                     <li
                        className='cursor-pointer'
                        ref={(element) => (liRefs.current[6] = element)}
                        onClick={() => {
                           handleClick(6);
                        }}
                     >
                        Profile
                     </li>
                  </ul>
               </>
            )}
         </div>
      </div>
   );
}

export default SideBar;
