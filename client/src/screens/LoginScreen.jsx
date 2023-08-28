import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from '../assets/logo2.png';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../Slices/authSlice';
import { useLoginMutation } from '../Slices/userApiSlice';

function LoginScreen() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [showModel, setShowModel] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   //TODO: API and LocalStorage's data
   const [login, { isLoading }] = useLoginMutation();
   const { userInfo } = useSelector((state) => state.auth);

   //Todo: Checking if the user already is logged in
   useEffect(() => {
      if (userInfo) {
         navigate('/');
      }
   }, [userInfo, navigate]);

   //Todo: sending the data to the backend using redux

   const submitHandler = async (e) => {
      e.preventDefault();

      try {
         const res = await login({ email, password }).unwrap();
         dispatch(setCredentials({ ...res }));
      } catch (error) {
         console.log(error);
      }
   };

   const handleForm = (e) => {
      e.preventDefault();
      setShowModel(!showModel);
   };

   return (
      <div className={'relative'}>
         {showModel && (
            <div className=' bg-gray-100 2xl:absolute 2xl:left-1/3 2xl:top-32  2xl:h-3/5 2xl:w-1/4  rounded-md shadow-2xl w-3/1 block z-10 absolute left-96 top-14 h-4/5   border    border-black opacity-100'>
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
                     <form>
                        <div className='flex m-2 mt-4'>
                           <input
                              type='text'
                              placeholder='First name'
                              className='py-2 px-2 outline-none border border-black  rounded'
                           />
                           <input
                              type='text'
                              placeholder='Last name'
                              className='py-2 px-2 outline-none border border-black  rounded ml-6'
                           />
                        </div>

                        <div className='flex flex-col m-2 mt-8'>
                           <input
                              type='text'
                              placeholder='Email'
                              className='py-2 px-2 outline-none border border-black  rounded'
                           />
                           <input
                              type='password'
                              placeholder='Password'
                              className='py-2 px-2 outline-none border border-black  rounded mt-6'
                           />
                        </div>
                        <button
                           type='submit'
                           className='border border-black py-3 px-2 w-44 ml-32 mt-8 rounded bg-[#3ab6ff] font-semibold hover:bg-[#1a212d] hover:text-[#96cae3]'
                        >
                           Sign up
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         )}
         <div
            className={
               showModel
                  ? ' opacity-25 2xl:opacity-25 flex justify-around gap-4 items-center relative '
                  : 'flex justify-around gap-4 items-center relative  '
            }
         >
            <div className='mt-28  2xl:mt-72'>
               <img src={logo2} alt='logo' />
            </div>
            <form
               onSubmit={submitHandler}
               className='flex flex-col mt-20 2xl:mt-72 border border-black py-10 px-20 rounded-lg shadow-2xl'
            >
               <input
                  type='text'
                  placeholder='Email '
                  className='py-3 px-2 text-start outline-none border border-black mb-4 rounded-md w-96'
                  onChange={(e) => setEmail(e.target.value)}
               />
               <input
                  type='password'
                  placeholder='Password'
                  className='py-3 px-2 outline-none border border-black  rounded-md'
                  onChange={(e) => setPassword(e.target.value)}
               />

               <button
                  type='submit'
                  className='mt-6 border border-black py-3 rounded-md bg-[#1a212d] text-white '
               >
                  {isLoading ? 'loading...' : 'Login'}
               </button>
               <p className='border-2 border-black mt-6 mb-4'></p>
               {/* <Link to='/register'> */}
               <button
                  type=''
                  className='border border-black py-3 px-2 w-44 ml-28 rounded bg-[#3ab6ff] font-semibold hover:bg-[#1a212d] hover:text-[#96cae3]'
                  onClick={handleForm}
               >
                  Create new account
               </button>
               {/* </Link> */}
            </form>
         </div>
      </div>
   );
}

export default LoginScreen;
