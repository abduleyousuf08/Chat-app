import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from '../assets/logo2.png';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../Slices/authSlice';
import {
   useLoginMutation,
   useCreateUserMutation,
} from '../Slices/userApiSlice';
import { toast } from 'react-toastify';

//

function LoginScreen() {
   ///

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [showModel, setShowModel] = useState(false);
   const [LoginEmail, setLoginEmail] = useState('');
   const [LoginPassword, setLoginPassword] = useState('');

   //*Create Accounts Data
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   //TODO: API and LocalStorage's data
   const [login, { isLoading }] = useLoginMutation();
   const [createUser, { isLoading: loading }] = useCreateUserMutation();
   const { userInfo } = useSelector((state) => state.auth);

   //Todo: Checking if the user already is logged in
   useEffect(() => {
      if (userInfo) {
         navigate('/');
      }
   }, [userInfo, navigate]);

   //Todo: Login a existing user
   const submitHandler = async (e) => {
      e.preventDefault();

      try {
         const res = await login({ LoginEmail, LoginPassword }).unwrap();
         dispatch(setCredentials({ ...res }));
         const firstNameIndex = res.name.split(' ');
         toast.success('Welcome Back ' + firstNameIndex[0]);
      } catch (error) {
         toast.error(error?.data || ' Try again');
      }
   };

   //Todo:Create a user
   const handleSaveUser = async (e) => {
      e.preventDefault();

      try {
         const res = await createUser({
            firstName,
            lastName,
            email,
            password,
         }).unwrap();
         dispatch(setCredentials({ ...res }));
         toast.success('Welcome' + res.name);
      } catch (error) {
         toast.error(error.error || 'User created');
      }
   };

   //Todo: Show Model
   const handleForm = (e) => {
      e.preventDefault();
      setShowModel(!showModel);
   };

   return (
      <div className={'relative flex justify-around gap-4 items-center'}>
         <div className='mt-28  2xl:mt-72'>
            <img src={logo2} alt='logo' />
         </div>
         {showModel ? (
            <div className=' bg-gray-100 2xl:mt-52  mt-20  p-10   2xl:h-5/6 2xl:w-2/5  rounded-md shadow-2xl w-3/1 block z-10  h-5/6   border    border-black opacity-100'>
               <div>
                  <div className='flex justify-between items-center mx-4 my-2'>
                     <div>
                        <h1 className='text-2xl font-semibold'>Sign Up</h1>
                        <p className='mt-2 text-gray-500 font-semibold'>
                           It's quick and easy
                        </p>
                     </div>
                     <GrClose
                        size={25}
                        className='cursor-pointer '
                        onClick={handleForm}
                     />
                  </div>
                  <p className='border-2 border-gray-300 mt-4 mb-4 mx-2'></p>
                  <div>
                     <form onSubmit={handleSaveUser}>
                        <div className='flex m-2 mt-4'>
                           <input
                              type='text'
                              placeholder='First name'
                              className='py-2 px-2 outline-none border border-black  rounded'
                              onChange={(e) => setFirstName(e.target.value)}
                           />
                           <input
                              type='text'
                              placeholder='Last name'
                              className='py-2 px-2 outline-none border border-black  rounded ml-6'
                              onChange={(e) => setLastName(e.target.value)}
                           />
                        </div>

                        <div className='flex flex-col m-2 mt-8'>
                           <input
                              type='text'
                              placeholder='Email'
                              className='py-2 px-2 outline-none border border-black  rounded'
                              onChange={(e) => setEmail(e.target.value)}
                           />
                           <input
                              type='password'
                              placeholder='Password'
                              className='py-2 px-2 outline-none border border-black  rounded mt-6'
                              onChange={(e) => setPassword(e.target.value)}
                           />
                        </div>
                        <button
                           type='submit'
                           className='border border-black py-3 px-2 w-44 ml-32 mt-8  2xl:ml-60 rounded bg-[#3ab6ff] font-semibold hover:bg-[#1a212d] hover:text-[#96cae3]'
                        >
                           {loading ? 'Creating Account....' : 'Sign Up'}
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         ) : (
            <div
               className={
                  showModel
                     ? ' opacity-25 2xl:opacity-25  relative '
                     : 'flex justify-around gap-4 items-center relative 2xl:h-5/6 2xl:w-1/4 2xl:mt-52  border border-black py-10 px-20 rounded-lg shadow-2xl'
               }
            >
               <form onSubmit={submitHandler} className='flex flex-col '>
                  <input
                     type='text'
                     placeholder='Email '
                     className='py-3 px-2 text-start outline-none border border-black mb-4 rounded-md w-96'
                     onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <input
                     type='password'
                     placeholder='Password'
                     className='py-3 px-2 outline-none border border-black  rounded-md'
                     onChange={(e) => setLoginPassword(e.target.value)}
                  />

                  <button
                     type='submit'
                     className='mt-6 border border-black py-3 rounded-md bg-[#1a212d] text-white '
                  >
                     {isLoading ? 'loading...' : 'Login'}
                  </button>
                  <p className='border-2 border-black mt-6 mb-4'></p>

                  <button
                     type=''
                     className='border border-black py-3 px-2 w-44 ml-28 rounded bg-[#3ab6ff] font-semibold hover:bg-[#1a212d] hover:text-[#96cae3]'
                     onClick={handleForm}
                  >
                     Create new account
                  </button>
               </form>
            </div>
         )}
      </div>
   );
}

export default LoginScreen;
