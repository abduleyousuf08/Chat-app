import { GoSearch } from 'react-icons/go';

function SearchBar() {
   return (
      <div className='mr-6'>
         <form className='flex border border-[#b7b7a4] py-2 px-2 outline-none   rounded ml-6 w-full mb-4  '>
            <GoSearch size={18} className='mt-0' />
            <input
               type='text'
               placeholder='Search'
               className='outline-none ml-3 w-full '
            />
         </form>
      </div>
   );
}

export default SearchBar;
