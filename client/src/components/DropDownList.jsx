function DropDownList() {
   return (
      <div className='absolute left-36 mt-4 bg-[#1a212d] z-40 py-2  text-white h-40 w-48 '>
         <ul className=''>
            <li className='cursor-pointer mb-4 hover:bg-[#96cae3] pl-2 hover:font-semibold py-1 px-2 '>
               New Group{' '}
            </li>
            <li className='cursor-pointer mb-4 hover:bg-[#96cae3] pl-2 hover:font-semibold py-1 px-2 '>
               Starred Messages
            </li>
            <li className=' cursor-pointer mb-4 hover:bg-[#96cae3] pl-2 hover:font-semibold py-1 px-2 '>
               Settings
            </li>
         </ul>
      </div>
   );
}

export default DropDownList;
