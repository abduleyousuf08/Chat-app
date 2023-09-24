import { useSelector, useDispatch } from 'react-redux';
import { useContext, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { FiEdit2 } from 'react-icons/fi';

import {
   useLogoutMutation,
   useUpdateUserMutation,
} from '../Slices/userApiSlice';
import { removeCredentials, setCredentials } from '../Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//*COMPONENTS
import Avatar from './Avatar';
import { ChatContext } from '../Context/ChatContext';
import CustomAlert from './CustomAlert';

function ShowMyProfile() {
   const { showProfile } = useContext(ChatContext);

   const [isAlertVisible, setIsAlertVisible] = useState(false);

   // Function to show the custom alert
   const showAlert = () => {
      setIsAlertVisible(true);
   };

   // Function to hide the custom alert
   const hideAlert = () => {
      setIsAlertVisible(false);
   };

   ///

   const navigate = useNavigate();
   const dispatch = useDispatch();

   //* Conditional rendering states
   const [isName, setIsName] = useState(false);
   const [isBio, setIsBio] = useState(false);
   const [isProfile, setIsProfile] = useState(false);

   //* Values to send
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [bio, setBio] = useState('');
   const [profile, setProfile] = useState();

   const [profilePreview, setProfilePreview] = useState(null);

   //Todo: Appending data using form data to send files
   const formData = new FormData();
   formData.append('firstName', firstName);
   formData.append('lastName', lastName);
   formData.append('bio', bio);
   formData.append('profile', profile);

   const { userInfo } = useSelector((state) => state.auth);

   //* Requesting log out API
   const [logout, { isLoading }] = useLogoutMutation();
   const [updateUser, { isLoading: loading }] = useUpdateUserMutation();

   //Todo: closeProfile handler
   function handleCloseProfile() {
      showProfile('myProfile');
   }

   //Todo: True/false functio setter
   function handleEdit(type) {
      if (type === 'name') {
         setIsName(!isName);
      } else if (type === 'bio') {
         setIsBio(!isBio);
      }
   }

   //Todo: LogOut function handler
   async function handleLogOut() {
      showAlert();
   }

   const hideCustomAlert = async () => {
      await logout().unwrap();
      dispatch(removeCredentials());
      navigate('/login');
      hideAlert();
   };

   const handleLogoutCancel = () => {
      hideAlert();
   };

   //Todo: update user data handler
   async function handleUpdateData(e) {
      e.preventDefault();

      try {
         const res = await updateUser(formData).unwrap();
         dispatch(setCredentials(res));
         toast.success('User updated');
      } catch (error) {
         console.log(error);
         toast.error(error?.error || 'User not updated , Try again');
      }
   }

   return (
      <>
         {isAlertVisible && (
            <CustomAlert
               title='Your logging out '
               message='One last check before you walk the TalkWave plank?'
               onConfirm={hideCustomAlert}
               onCancel={handleLogoutCancel}
            />
         )}

         <div className='flex flex-col w-1/2 ml-2 '>
            <div className='p-2'>
               <div className='flex justify-between items-center p-4'>
                  <h1 className='text-2xl font-uls'>Profile</h1>
                  <GrFormClose
                     size={28}
                     className='cursor-pointer'
                     onClick={handleCloseProfile}
                  />
               </div>
               <p className='border pl-0 border-gray-200 mt-2  mr-2'></p>
               <div className='flex flex-col justify-center items-center mt-4 mb-20 2xl:mt-14 2xl:mb-28'>
                  <div className='relative group '>
                     <Avatar
                        width={100}
                        image={profilePreview || userInfo?.profile}
                     />
                     <label
                        htmlFor='avatar-upload'
                        className='absolute inset-0 flex items-center justify-center cursor-pointer w-full h-full opacity-0 group-hover:opacity-100 bg-gray-300 transition-opacity duration-300 ease-in-out rounded-full'
                     >
                        <input
                           type='file'
                           id='avatar-upload'
                           className='hidden'
                           onChange={(e) => {
                              const selectedFile = e.target.files[0];
                              setProfile(selectedFile);

                              const reader = new FileReader();
                              reader.onload = (event) => {
                                 setProfilePreview(event.target.result);
                              };
                              reader.readAsDataURL(selectedFile);
                           }}
                           onClick={() => setIsProfile(!isProfile)}
                        />
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           className='h-6 w-6 text-[#4baed0] group-hover:text-[#4baed0] transition-colors duration-300 ease-in-out'
                           fill='none'
                           viewBox='0 0 24 24'
                           stroke='currentColor'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                           />
                        </svg>
                     </label>
                  </div>

                  <div className='flex items-center  font-userName mt-2 ml-6 '>
                     <form>
                        <input
                           type='text'
                           name=''
                           id=''
                           placeholder={userInfo?.name}
                           className={
                              isName
                                 ? 'font-userName outline-none border-b border-gray-800 placeholder-black w-28'
                                 : 'font-userName outline-none  placeholder-black w-28'
                           }
                           readOnly={isName ? false : true}
                           onChange={(e) => {
                              const fullName = e.target.value;

                              const nameParts = fullName.split(' ');
                              if (nameParts.length === 2) {
                                 setFirstName(nameParts[0]);
                                 setLastName(nameParts[1]);
                              } else {
                                 setFirstName(fullName);
                                 setLastName('');
                              }
                           }}
                        />
                     </form>
                     <FiEdit2
                        className='ml-2 cursor-pointer text-[#4baed0]'
                        size={20}
                        color=''
                        onClick={() => handleEdit('name')}
                     />
                  </div>
                  <p className='text-gray-500 mt-2  text-center'>
                     This name will be visible to your TalkWave contacts
                  </p>
               </div>
               <h1 className='flex items-center  justify-between font-uls text-xl'>
                  About{' '}
                  <FiEdit2
                     className='mr-28 cursor-pointer text-[#4baed0] font-bold'
                     size={20}
                     color='#4baed0'
                     onClick={() => handleEdit('bio')}
                  />
               </h1>

               <form className='mb-4'>
                  <textarea
                     readOnly={isBio ? false : true}
                     placeholder={userInfo?.bio}
                     onChange={(e) => setBio(e.target.value)}
                     className={
                        isBio
                           ? 'font-userName outline-none border-b border-gray-800 placeholder-black w-72'
                           : 'font-userName outline-none  placeholder-black w-80'
                     }
                  ></textarea>
               </form>
            </div>
            {isName || isProfile || isBio ? (
               <button
                  type='
               submit'
                  onClick={handleUpdateData}
                  className=' py-2 px-2 border border-black w-28   rounded-xl bg-[#1a212d] text-white'
               >
                  {loading ? (
                     <p className='flex items-center'>
                        <svg
                           class=' bg-white animate-spin h-8 w-8 mr-3 ...'
                           viewBox='0 0 24 24'
                        ></svg>
                        {'  '} Updating..
                     </p>
                  ) : (
                     'Update'
                  )}
               </button>
            ) : null}

            <button
               onClick={handleLogOut}
               className='mt-12 2xl:mt-64 py-2 px-4 border border-black w-40 ml-20 2xl:ml-36 rounded-xl bg-[#1a212d] text-white'
            >
               {isLoading ? 'Logging out' : 'Log Out'}
            </button>
         </div>
      </>
   );
}

export default ShowMyProfile;
