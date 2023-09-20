import React from 'react';
import { GiThreeFriends } from 'react-icons/gi';

function NewUserHeader() {
   return (
      <div className='flex items-center justify-between'>
         <h1 className='text-2xl  ml-6 mb-4 mt-4 font-headerMessage'>
            Find Your friend here
         </h1>

         <GiThreeFriends size={27} />
      </div>
   );
}

export default NewUserHeader;
