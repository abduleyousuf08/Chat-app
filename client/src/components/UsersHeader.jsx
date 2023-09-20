import { BsThreeDots } from 'react-icons/bs';
import { useState, useRef, useEffect } from 'react';

//? COMPONENTS
import DropDownList from './DropDownList';

function UsersHeader() {
   const [listShow, setListShow] = useState(false);
   const dropdownRef = useRef(null);

   useEffect(() => {
      function handleClickOutside(event) {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setListShow(false);
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
         document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   return (
      <div>
         <div className='flex items-center justify-between'>
            <h1 className='text-2xl  ml-6 mb-4 mt-4 font-headerMessage'>
               Messages
            </h1>

            <div ref={dropdownRef}>
               <BsThreeDots
                  size={22}
                  className='cursor-pointer'
                  onClick={() => setListShow(!listShow)}
               />
               {listShow && <DropDownList />}
            </div>
         </div>
      </div>
   );
}

export default UsersHeader;
