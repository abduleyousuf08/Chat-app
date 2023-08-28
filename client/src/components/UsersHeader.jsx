import { BsThreeDots } from 'react-icons/bs';
import { useState } from 'react';

//? COMPONENTS
import DropDownList from './DropDownList';

function UsersHeader() {
   const [listShow, setListShow] = useState(false);

   return (
      <div>
         <div className='flex items-center justify-between'>
            <h1 className='text-2xl  ml-6 mb-4 mt-4 font-headerMessage'>
               Messages
            </h1>

            <div>
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
