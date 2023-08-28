import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
//import { usernameValidate } from '../helper/validate';
import { passwordValidate } from '../helper/validate';
import { resetPassword } from '../helper/helper';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import useFetch from '../hooks/fetchhooks';


const Reset = () => {
  const { username } = useAuthStore(state => state.auth);
   const navigate = useNavigate();
   const [{ apiData, isLoading, status, serverError }] = useFetch('createResetSession')
  const formik = useFormik({
    initialValues : {
        password: 'admin123',
        confirm_pwd: 'admin123'
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      let resetPromise = resetPassword({ username, password: values.password });
      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully!</b>,
        error: <b>Could not reset</b>
      });
     resetPromise.then(function(){navigate('/')})
    }

  });

  return (
    <div className='container mx-auto'>
       <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}>
            
            <div>
             <h4 className='title flex flex-col items-center'>
              Reset  
             </h4>
             <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Enter new Password
                </span>
           </div>

           <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='textbox flex flex-col items-center gap-6'>
                <input {...formik.getFieldProps('password')} className={styles.textbox} type="New password" placeholder="Password" />
                <input {...formik.getFieldProps("confirm_pwd")} className={styles.textbox} type="Repeat password" placeholder='password' />
                <button className={styles.btn} type='submit'>Let's Go</button>
              </div>

              <div className='text-center py-4'>
                <span className='text-gray-500'>Fogot password? <Link to="/recovery">Recover now</Link></span>
              </div>
 
           </form>

          </div>
        </div>
    </div>
  )
}

export default Reset;
