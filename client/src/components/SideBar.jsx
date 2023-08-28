import logo4 from '../assets/logo4.png';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
   const liRefs = useRef([]); // Ref to store the array of li elements

   const handleClick = (index) => {
      // Update styles for clicked li and reset styles for others
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
               ); // Hide the span element
            }
         } else {
            liRef.classList.remove(
               'bg-[#96cae3]',
               'text-black',
               'py-1',
               'px-2'
            ); // Remove active style class
            const spanElement = liRef.querySelector('.notification-span'); // Get the span element
            if (spanElement) {
               spanElement.classList.remove(
                  'text-white',
                  'bg-[#96cae3]',
                  'border-none',
                  'font-semibold'
               ); // Hide the span element
            }
         }
      });
   };
   return (
      <div className='bg-[#1a212d] inline-block text-white h-screen w-80 overflow-y-scroll  overflow-x-hidden '>
         <Link to='/'>
            <img src={logo4} alt='' width={80} className='2xl:mt-4' />
         </Link>
         <div className='pl-8 mt-10 2xl:mt-20'>
            <ul className='mb-6'>
               <li
                  className='mb-4 cursor-pointer'
                  ref={(element) => (liRefs.current[0] = element)}
                  onClick={() => handleClick(0)}
               >
                  Messsages
                  <span className='bg-black py-1 px-1 ml-4 text-xs rounded-lg   notification-span'>
                     12
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
            <ul className='mb-36 2xl:mb-96'>
               <li
                  className='mb-4 cursor-pointer'
                  ref={(element) => (liRefs.current[4] = element)}
                  onClick={() => handleClick(4)}
               >
                  Call
               </li>
            </ul>
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
                  onClick={() => handleClick(6)}
               >
                  Profile
               </li>
            </ul>
         </div>
      </div>
   );
}

export default SideBar;
