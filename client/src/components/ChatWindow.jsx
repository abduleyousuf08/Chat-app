import { dummyMessages } from '../MessageData';
import MessageCard from './MessageCard';

function ChatWindow({ messages }) {
   return (
      <div className='py-3 overflow-y-scroll overflow-x-hidden h-80 2xl:h-[600px]'>
         {messages.data.map((message) => (
            <MessageCard message={message} />
         ))}
      </div>
   );
}

export default ChatWindow;
