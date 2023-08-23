import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
//import { usernameValidate } from '../helper/validate';
import { passwordValidate } from '../helper/validate';
import convertTobase64 from '../helper/convert';
import extend from '../styles/Profile.module.css';


const Profile = () => {
  const [file, setFile] = useState();


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
          <div className={`${styles.glass} ${extend.glass}`} style={{ width: "450" }}>
            
            <div className='title flex flex-col items-center'>
             <h4 className='text-5xl font-bold'>
              Profile
             </h4>
             <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Update your profile
                </span>
           </div>

           <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                <label html="profile">
                <img src={file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar"  />
                </label>
               
               <input onChange={Upload} type="file" id="profile" name='profile' />
               </div>
    

              <div className='textbox flex flex-col items-center gap-6'>
                <div className='name flex w-3/4 gap-10'>
                  <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='firstName'  />
                  <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='lastName'  />
                </div>

                <div className='name flex w-3/4 gap-10'>
                <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Username" />
                <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="email" placeholder="Email" />
                </div>

                <div>
                <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Address" />
                <button className={styles.btn} type='submit'>Sign Up</button>
                </div>
                
              </div>

              <div className='text-center py-4'>
                <span className='text-gray-500'>Already Registered? <Link to="/recovery">Sign In</Link></span>
              </div>
 
           </form>

          </div>
        </div>
    </div>
  )
}

export default Profile;
