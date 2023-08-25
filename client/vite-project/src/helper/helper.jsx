// Make api request
import axios from axios;


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

}







