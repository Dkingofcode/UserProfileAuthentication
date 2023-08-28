import { useState } from 'react';
import './App.css';
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthorizeUser } from './middleware/auth';


function App() {
  

  return (

    <>
    <Router>
      <Routes>
      <Route path="/" element={<Username  />} />
      <Route path="/register" element={<Register />} />
       <Route path="/password" element={<Password />}  />
       <Route path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser>}  />
       <Route path="/recovery" element={<Recovery />}  />
       <Route path="/reset" element={<Reset />}  />
       <Route path="*" element={<PageNotFound />}  />

        
        </Routes>
      </Router>
      <div className='text-3xl font-bold underline'>
    <h1>User Authentication</h1>
    </div>
    </>
  )
}

export default App;
