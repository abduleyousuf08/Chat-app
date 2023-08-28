//? COMPONENTS
import ChatHeader from './ChatHeader';
import ChatWindow from './ChatWindow';
import ChatFooter from './ChatFooter';
import DefaultWindowChat from './DefaultWindowChat';

function Chat({ messages, userData }) {
   return (
      <div className='flex flex-col justify-between px-2 py-4 w-screen'>
         {messages?.data?.length > 0 ? (
            <>
               <div>
                  <ChatHeader userData={userData} />
                  <ChatWindow messages={messages} />
               </div>
               <ChatFooter />
            </>
         ) : (
            <div className='flex justify-center items-center '>
               <DefaultWindowChat />
            </div>
         )}
      </div>
   );
}

export default Chat;
