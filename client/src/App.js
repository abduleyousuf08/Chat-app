import './App.css';
import { Outlet } from 'react-router-dom';

//* COMPONENTS

function App() {
   return (
      <>
         <main>
            <Outlet />
         </main>
      </>
   );
}

export default App;
