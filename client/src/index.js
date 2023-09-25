import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

//* COMPONENTS
import App from './App';
import ChatApp from './screens/ChatApp';
import LoginScreen from './screens/LoginScreen';
import PrivateRoute from './components/PrivateRoute';

//*Packages
import {
   createBrowserRouter,
   Route,
   createRoutesFromElements,
   RouterProvider,
} from 'react-router-dom';

import store from './store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChatContextProvider } from './Context/ChatContext';

const queryClient = new QueryClient();

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path='/' element={<App />}>
         <Route path='/login' element={<LoginScreen />} />

         <Route path='' element={<PrivateRoute />}>
            <Route index={true} path='/' element={<ChatApp />} />
         </Route>
      </Route>
   )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <Provider store={store}>
            <ChatContextProvider>
               <RouterProvider router={router} />
            </ChatContextProvider>
         </Provider>
      </QueryClientProvider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
