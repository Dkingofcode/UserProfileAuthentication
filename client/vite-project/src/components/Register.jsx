import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
//import { usernameValidate } from '../helper/validate';
import { passwordValidate } from '../helper/validate';
import convertTobase64 from '../helper/convert';


const Register = () => {
  const [file, setFile] = useState()


    const formik = useFormik({
    initialValues : {
        email: 'reiihi5726oi@firetrer.com',
        username: 'exampl345',
        password: 'admin345'
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
        values = await Object.assign(values, { profile: file || ''})
        console.log(values);  
    }
  });

  /* formik doesn't support file upload ao we need to create this handler */
  const Upload = async e => {
    const base64 = await convertTobase64(e.target.file[0]);
    setFile(base64);
  }

  return (
    <div className='container mx-auto'>
       <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}>
            
            <div className='title flex flex-col items-center'>
             <h4 className='text-5xl font-bold'>
              Register  
             </h4>
             <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Happy to join you!
                </span>
           </div>

           <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                <label html="profile">
                <img src={file || avatar} className={styles.profile_img} alt="avatar"  />
                </label>
               </div>
               
               <input onChange={Upload} type="file"  id="profile" />


              <div className='textbox flex flex-col items-center gap-6'>
                <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder="Username" />
                <input {...formik.getFieldProps('email')} className={styles.textbox} type="email" placeholder="Email" />
                <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder="Password" />
                <button className={styles.btn} type='submit'>Sign Up</button>
              </div>

              <div className='text-center py-4'>
                <span className='text-gray-500'>Fogot password? <Link to="/recovery">Recover Now</Link></span>
              </div>
 
           </form>

          </div>
        </div>
    </div>
  )
}

export default Register;
