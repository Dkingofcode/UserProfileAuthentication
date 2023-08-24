import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from "../config.js";

/**  middleware for verify user */
export async function verifyUser(req, res, next){
   try{

       const { username } = req.method == "GET" ? req.query : req.body;
       
       // check use3r existence
       const user = await UserModel.findOne({ username });
       if(!user) return res.status(404).send({ error: "Can't Find User!"});
       next();
    } catch (error){
        return res.status(404).send({ error: "Authentication Error"}); 
    }
 }


/** POST http://localhost:8000/api/register */
export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        // Check if the username already exists
        const userExists = await UserModel.findOne({ username }).exec();

        if (userExists) {
            return res.status(400).json({ error: "Please use a unique Username" });
        }

        // Check if the email already exists
        const emailExists = await UserModel.findOne({ email }).exec();

        if (emailExists) {
            return res.status(400).json({ error: "Please use a unique email" });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new UserModel({
                username,
                email,
                password: hashedPassword,
                profile: profile || ''
            });

            await user.save();

            return res.status(201).json({ msg: "Registration successful" });
        }

        return res.status(500).json({ error: "Unable to hash password" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred" });
    }
}


/** POST http://localhost:8000/api/login */
export async function login(req, res){ 
   // res.json('login route');
   try{
   const { username, password }=  req.body;

   const User = await UserModel.findOne({ username }).exec();
 
   if(!User){
      return res.status(400).json({ error: "User not found"}) 
   }

   // Compare passwords
   const isPasswordMatch = await bcrypt.compare(password, User.password);
   // create jwt token
   const token = jwt.sign({
     userId: User._id,
     username: User.username
   }, 'secret', { expiresIn : "24h"});
 


   if(isPasswordMatch){
      // Passwords match, you can generate and return a token here    
      return res.status(200).json({ msg: "Login successful", username: User.username, token });
    } else{
       return res.status(401).json({ error: "Invalid password" }) 
    }
   }catch(error){
     return res.status(500).send({ error });   
   }
}

/** GET http://localhost:8000/api/example123 */
export async function getUser(req, res){
    res.json('getUser route');
}



/** PUT http://localhost:8000/api/updateUser */
export async function updateUser(req, res){
    res.json('updateUser route');
}



// /** PUT http://localhost:8000/api/updateuser */
// export async function updateUser(req, res){
//     res.json('Update route');
// } 

/** GET: http://localhost:8000/api/generateOTP */
export async function generateOTP(req, res){
    res.json('Update route');
} 
 
/** GET: http://localhost:8000/api/verifyOTP */
export async function verifyOTP(req, res){
    res.json('verifyOTP route');
} 


// successfully redirect user when OTP is valid
/** GET http://localhost:8000/api/verifyOTP */
export async function createResetSession(req, res){
    res.json('verifyOTP route');
} 


/** GET  http://localhost:8000/api/verifyOTP */
export async function resetPassword(req, res){
    res.json('resetPassword route');
}