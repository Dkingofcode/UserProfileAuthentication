import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';

const Username = () => {
  return (
    <div className='container mx-auto'>
        <div className='flex justify-center items-center h-screen'>
          <div>
            
            <div>
             <h4 className='title flex flex-col items-center'>
              Hello Again!  
             </h4>
             <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Explore More by connecting with us.
                </span>
           </div>

           <form className='py-1'>
              <div className='profile flex justify-center py-4'>
                <img src={avatar} alt="avatar"  />
              </div>

              <div className='textbox flex flex-col items-center gap-6'>
                <input type="text" placeholder="Username" />
                <button type='submit'>Let's Go</button>
              </div>

              <div className='text-center py-4'>
                <span className='text-gray-500'>Not a Member <Link to="/register">Register Now</Link></span>
              </div>
 
           </form>

          </div>
        </div>
    </div>
  )
}

export default Username;
