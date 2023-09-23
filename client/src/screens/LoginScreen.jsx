import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import person2 from '../assets/person2.jpg';
import person from '../assets/person.jpg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../Slices/authSlice';
import {
   useLoginMutation,
   useCreateUserMutation,
} from '../Slices/userApiSlice';
import { toast } from 'react-toastify';

function LoginScreen() {
   //*Hook states
   const navigate = useNavigate();
   const dispatch = useDispatch();

   //*Normal states
   const [showModel, setShowModel] = useState(false);
   const [LoginEmail, setLoginEmail] = useState('');
   const [LoginPassword, setLoginPassword] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showEye, setShowEye] = useState(false);

   //*Redux states
   const [login, { isLoading }] = useLoginMutation();
   const [createUser, { isLoading: loading }] = useCreateUserMutation();
   const { userInfo } = useSelector((state) => state.auth);

   useEffect(() => {
      if (userInfo) {
         navigate('/');
      }
   }, [userInfo, navigate]);

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
         toast.success('Welcome ' + res.name);
      } catch (error) {
         toast.error(error.error || 'User created');
      }
   };

   const handleForm = (e) => {
      e.preventDefault();
      setShowModel(!showModel);
   };

   function handleToggleEye() {
      setShowEye(!showEye);
   }

   return (
      <div className='bg-[#F3F5F9] w-screen h-screen p-10'>
         <div className='flex justify-evenly items-center border border-gray-300 rounded-lg w-3/4  ml-44 2xl:mt-40 2xl:h-3/5 bg-[#ffffff]  '>
            {showModel ? (
               <>
                  <div className='w-full ml-8    '>
                     <div className='py-8'>
                        <h1 className='text-3xl font-bold font-userName'>
                           Create Account
                        </h1>
                        <div className='mt-2'>
                           <h3 className='text-lg font-userName'>
                              Start networking on{' '}
                              <Link
                                 to={
                                    'https://www.google.com/search?sca_esv=567804936&sxsrf=AM9HkKmeOxkd5MuVt7KfxDj0BVif8pwzFA:1695454217110&q=talkwave&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjYh9-Sm8CBAxVbh_0HHegbDVsQ0pQJegQIDBAB&biw=1366&bih=611&dpr=1'
                                 }
                              >
                                 <span className='underline text-[#4BAFCF]'>
                                    TalkWave
                                 </span>
                              </Link>
                           </h3>
                           <p className='text-gray-400'>
                              Welcome aboard to TalkWave!
                           </p>
                        </div>
                        <div className='mt-2'>
                           <form
                              className='flex flex-col'
                              onSubmit={handleSaveUser}
                           >
                              <label className='text-md  font-userName'>
                                 First name
                              </label>
                              <input
                                 type='text'
                                 name=''
                                 id=''
                                 className='border border-gray-400 outline-none py-1 px-2 rounded-md'
                                 onChange={(e) => setFirstName(e.target.value)}
                              />
                              <label className='text-md  font-userName'>
                                 Last name
                              </label>
                              <input
                                 type='text'
                                 name=''
                                 id=''
                                 className='border border-gray-400 outline-none py-1 px-2 rounded-md'
                                 onChange={(e) => setLastName(e.target.value)}
                              />

                              <label className='text-md  font-userName'>
                                 Email
                              </label>
                              <input
                                 type='text'
                                 name=''
                                 id=''
                                 className='border border-gray-400 outline-none py-1 px-2 rounded-md'
                                 onChange={(e) => setEmail(e.target.value)}
                              />
                              <label className='text-md  font-userName'>
                                 Password
                              </label>
                              <div className='flex justify-between items-center border border-gray-400 rounded-md  '>
                                 <input
                                    type={showEye ? 'text' : 'password'}
                                    name=''
                                    id=''
                                    className='py-1 px-2  outline-none rounded-md'
                                    onChange={(e) =>
                                       setPassword(e.target.value)
                                    }
                                 />

                                 {showEye ? (
                                    <BsEye
                                       className='mr-4 cursor-pointer'
                                       size={23}
                                       onClick={handleToggleEye}
                                    />
                                 ) : (
                                    <BsEyeSlash
                                       className='mr-4 cursor-pointer'
                                       size={23}
                                       onClick={handleToggleEye}
                                    />
                                 )}
                              </div>
                              <div className='flex justify-between items-center mt-2'>
                                 <label className='custom-checkbox'>
                                    <input type='checkbox' name='' id='' />
                                    <span className='custom-checkbox-label mr-2 w-6 h-6'></span>
                                    Remember me
                                 </label>

                                 <div>
                                    <Link className='underline text-[#4BAFCF] font-semibold'>
                                       Reset Password
                                    </Link>
                                 </div>
                              </div>

                              <div className='mt-8'>
                                 <button className='ml-32 border border-gray-300 py-2 px-6 rounded-md bg-[#4BAFCF] hover:bg-[#1B202C] hover:text-[#4BAFCF] font-userName '>
                                    {loading ? 'Joining...' : 'Join TalkWave'}
                                 </button>
                                 <p className='ml-28 font-userName italic mt-2'>
                                    Already have an account?
                                    <Link to={'/login'} onClick={handleForm}>
                                       <span className='underline text-[#4BAFCF]'>
                                          {' '}
                                          Login
                                       </span>
                                    </Link>
                                 </p>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
                  <div className='w-screen ml-52'>
                     <img
                        src={person2}
                        className='w-full 2xl:w-3/4 rounded-lg  2xl:ml-60'
                        alt='person'
                     />
                  </div>
               </>
            ) : (
               <>
                  <div className=' w-full'>
                     <img
                        src={person}
                        className='w-96 2xl:w-5/6 rounded-lg'
                        alt='person'
                     />
                  </div>
                  <div className='w-full mr-20 2xl:mr-80'>
                     <div className=''>
                        <h1 className='text-3xl font-bold font-userName'>
                           Login
                        </h1>
                        <div className='mt-2'>
                           <h3 className='text-lg font-userName'>
                              Login to your account{' '}
                           </h3>
                           <p className='text-gray-400'>
                              Thank you for get back to TalkWave
                           </p>
                        </div>
                        <div className='mt-2'>
                           <form
                              className='flex flex-col'
                              onSubmit={submitHandler}
                           >
                              <label className='text-md  font-userName'>
                                 Username
                              </label>
                              <input
                                 type='text'
                                 name=''
                                 id=''
                                 className='border border-gray-400 outline-none py-1 px-2 rounded-md'
                                 onChange={(e) => setLoginEmail(e.target.value)}
                              />
                              <label className='text-md  font-userName'>
                                 Password
                              </label>
                              <div className='flex justify-between items-center border border-gray-400 rounded-md  '>
                                 <input
                                    type={showEye ? 'text' : 'password'}
                                    name=''
                                    id=''
                                    className='py-1 px-2  outline-none rounded-md'
                                    onChange={(e) =>
                                       setLoginPassword(e.target.value)
                                    }
                                 />

                                 {showEye ? (
                                    <BsEye
                                       className='mr-4 cursor-pointer'
                                       size={23}
                                       onClick={handleToggleEye}
                                    />
                                 ) : (
                                    <BsEyeSlash
                                       className='mr-4 cursor-pointer'
                                       size={23}
                                       onClick={handleToggleEye}
                                    />
                                 )}
                              </div>

                              <div className='flex justify-between items-center mt-2'>
                                 <label className='custom-checkbox'>
                                    <input type='checkbox' name='' id='' />
                                    <span className='custom-checkbox-label mr-2 w-6 h-6'></span>
                                    Remember me
                                 </label>

                                 <div>
                                    <Link className='underline text-[#4BAFCF] font-semibold'>
                                       Reset Password
                                    </Link>
                                 </div>
                              </div>
                              <div className='mt-8'>
                                 <button className='ml-48 border border-gray-300 py-2 px-6 rounded-md bg-[#4BAFCF] hover:bg-[#1B202C] hover:text-[#4BAFCF] font-userName '>
                                    {isLoading ? 'Logging....' : 'Sign in'}
                                 </button>
                                 <p className='mt-4 ml-20 flex items-center text-sm'>
                                    <span className='font-messages mr-2'>
                                       Don't have an account yet ?
                                    </span>
                                    <Link onClick={handleForm}>
                                       <span className='text-[#4BAFCF] underline'>
                                          Join TalkWave community
                                       </span>
                                    </Link>
                                 </p>
                                 <p className='ml-32 font-userName mt-2'>
                                    📬Where messages make waves🚀
                                 </p>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}

export default LoginScreen;
