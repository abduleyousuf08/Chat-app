//? COMPONENTS
import UserItem from './UserItem';
import UsersHeader from './UsersHeader';
import SearchBar from './SearchBar';

function UsersList({ data, getChatId }) {
   return (
      <div className='relative  h-screen overflow-y-scroll overflow-x-hidden  w-1/2 2xl:w-1/3 px-2 mr-2 '>
         <UsersHeader />
         <SearchBar />

         {data.data.map((chat, index) => (
            <UserItem chat={chat} index={index} getChatId={getChatId} />
         ))}
      </div>
   );
}

export default UsersList;
