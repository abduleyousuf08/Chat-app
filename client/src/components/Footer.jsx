import React from 'react';

const Footer = () => {
   return (
      <header className='bg-gray-800 text-white py-3'>
         <div className='w-fit  mx-auto text-center'>
            <p className='text-2xl text-[#3FB7BB] font-bold font-userName'>
               Where messages make waves
            </p>
            <p className='text-[#97CAE3] font-bold font-headerMessage'>
               &copy; {new Date().getFullYear()} Abdule Y.
            </p>
         </div>
      </header>
   );
};

export default Footer;
