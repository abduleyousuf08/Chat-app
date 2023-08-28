import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import InputEmoji from 'react-input-emoji';

function ChatFooter() {
   const [text, setText] = useState('');

   function handleCall() {
      console.log('this', text);
      setText('');
   }

   return (
      <div className='flex h-24 border-2  '>
         <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            onEnter={handleCall}
            borderColor='#fff'
            shouldReturn={true}
            placeholder='Type a message'
         />

         <button
            onClick={handleCall}
            className='flex items-center  border border-gray-300 py-1 px-3 bg-[#4BAED0] text-white h-10 mt-6 mr-2 '
         >
            Send <IoIosArrowForward className='ml-2' />
         </button>
      </div>
   );
}

export default ChatFooter;
