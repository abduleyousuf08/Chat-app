import React, { useState, useEffect } from 'react';

const LoginScreenHeader = () => {
   const phrases = ['Chatting', 'Connecting', 'Engaging'];
   const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentPhraseIndex((prevIndex) =>
            prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
         );
      }, 3000);

      return () => clearInterval(interval);
   }, []);

   return (
      <header className='ml-4 mr-4 bg-gray-800 text-white py-2'>
         <div className='container mx-auto text-center'>
            <h1 className='text-2xl font-bold relative'>
               <span className='animate-bounce'>
                  {phrases[currentPhraseIndex]}
               </span>
            </h1>
         </div>
      </header>
   );
};

export default LoginScreenHeader;
