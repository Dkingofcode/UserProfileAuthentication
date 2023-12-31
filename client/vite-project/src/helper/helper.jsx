// Make api request
import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = import.meta.env.REACT_APP_SERVER_DOMAIN;

/**  To get username */
export async function getUsername(){
  const token = localStorage.getItem('token')
  if(!token) return Promise.reject("Cannot find token");
  let decode = jwt_decode(token)
  return decode;
}

/* authenticate   */
export async function authenticate(username){
   try{
     return await axios.post('/api/authenticate', { username })
   } catch(error){
      return { error: "Username doesn't exist...!"}
   }
}

/** get User details */
export async function getUser({ username }){
   try{
    const {data} = await axios.get(`/api/user/${username}`)
     return data   
} catch(error){
      return { error : "Password doesn't match...!"}
   }
}

export async function registerUser(credentials){
    try{
       const {data : { msg }, status } = await axios.post('/api/register', credentials);
        let { username, email} = credentials;

        /* send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text: msg })
        }
        return Promise.resolve(msg)
    }catch(error){
      return Promise.reject({ error })
    }
}

/* login function */
export async function verifyPassword({ username, password }){
   try{
     if(username){
        
        const { data } = await axios.post('/api/login', { username, password })
        return Promise.resolve({ data }) 
    }
   } catch(error){
      return Promise.reject({ error: "Password doesn't Match.....!"})
   }
}



/*  update user function  */
export async function updateUser(response){
    try{
        const token = await localStorage.getItem("token");
        const data = await axios.put("/api/updateuser", response, { headers : {"Authorization": `Bearer ${token}`}})
        
        return Promise.resolve({ data })
    }catch(error){
        Promise.reject({ error: "Couldn't update Profile....!" })
    }
}

/* generate OTP   */
export async function generateOTP(username){
  try{
   const { data : { code }, status} =  await axios.post('/api/generateOTP', { params: {username} })
     // send mail with OTP
     if (status == 201){
        let { data : { email }} = await getUser({ username });
        let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
        await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "password Recovery OTP" })
     }
     return Promise.resolve({data});
  }catch(error){
    return Promise.reject({ error }); 
  }
}

export async function verifyOTP({ username, code } ){
    try{
      const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code }})
      return { data, status }
    }catch(error){
        Promise.reject({ error: ""})
    }
}


export async function resetPassword({ username, password}){
    try{
      await axios.put('/api/resetPassword/',  { username, password });
      return Promise.resolve({ data, status})
    } catch(error){
        Promise.reject({ error})
    }
}