import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
//import { usernameValidate } from '../helper/validate';
import { passwordValidate } from '../helper/validate';
import useFetch from '../hooks/fetchhooks';
import { useAuthStore } from '../store/store';

const Password = () => {
   const { username } = useAuthStore(state => state.auth)
   const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`) 
   useFetch('/user/');
  
    const formik = useFormik({
    initialValues : {
        password: 'admin123'
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values);  
    }
  });

  if(isLoading ) return <h1 className='text-2xl font-bold'>isLoading</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className='container mx-auto'>
       <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}>
            
            <div>
             <h4 className='title flex flex-col items-center'>
              {apiData?.firstName || apiData?.username}
             </h4>
             <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Explore More by connecting with us.
                </span>
           </div>

           <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                <img src={avatar} className={styles.profile_img} alt="avatar"  />
              </div>

              <div className='textbox flex flex-col items-center gap-6'>
                <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder="Password" />
                <button className={styles.btn} type='submit'>Let's Go</button>
              </div>

              <div className='text-center py-4'>
                <span className='text-gray-500'>Fogot password <Link to="/recovery">Recover Now</Link></span>
              </div>
 
           </form>

          </div>
        </div>
    </div>
  )
}

export default Password;
