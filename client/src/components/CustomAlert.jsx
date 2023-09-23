import React from 'react';

const CustomAlert = ({ title, onCancel, message, onConfirm }) => {
   return (
      <div className='fixed inset-0 flex items-center justify-center z-50 '>
         <div className='w-2/5 2xl:h-1/4 h-68 bg-[#1a212d] text-white rounded-lg p-8 shadow-md'>
            <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
            <p className='text-white mb-6'>{message}</p>
            <div className='flex justify-end mt-16'>
               <button
                  className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4 transition duration-300 ease-in-out'
                  onClick={onConfirm}
               >
                  Confirm
               </button>
               <button
                  className='px-4 py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-200 transition duration-300 ease-in-out'
                  onClick={onCancel}
               >
                  Cancel
               </button>
            </div>
         </div>
      </div>
   );
};

export default CustomAlert;
