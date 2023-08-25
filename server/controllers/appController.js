import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from "../config.js";
import otpGenerator from 'otp-generator';


const OTP_CONFIG = {
    upperCaseAlphabets: true,
    specialChars: false,
  }

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
    const { username } = req.params;
    try{
       if(!username) return res.status(501).send({ error: "Invalid Username" });

       const user = await UserModel.findOne({ username });
       if(user){
           // mongoose returns unnecessary data with object so convert it to json
          const { password, ...rest } =  Object.assign({}, user.toJSON());
          return res.status(200).send(rest);
       }
       if(!user){
         return res.status(501).send({ error: "Cannot Find User"});  
       }else{
          return res.status(500).send({ error })
       }
    }catch(error){
      res.status(404).send({ error: "Cannot Find User Data" })
    }
    
    
    res.json('getUser route');
}



/** PUT http://localhost:8000/api/updateUser */
export async function updateUser(req, res){
    
    try{
     //const id = req.query.id;
      const { userId } =  req.user;

      if(id){
        const body = req.body;

        const updatedUser = await UserModel.updateOne({ _id: userId }, body);
        if(updatedUser){
           return res.status(201).send({ msg: "Record Updated...!"});
        }else if(err) {
          return  new Error(err); 
        }

     }else{
        return res.status(401).send({ error: "User not found...!" });
     }


    }catch(error){
    return  res.status(401).json({ error: "Cannot Update User"});  
    }   
    
    res.json('updateUser route');
}



// /** PUT http://localhost:8000/api/updateuser */
// export async function updateUser(req, res){
//     res.json('Update route');
// } 

/** GET: http://localhost:8000/api/generateOTP */
export async function generateOTP(req, res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    res.status(201).send({ code: req.app.locals.OTP })
   

 }
  
/** GET: http://localhost:8000/api/verifyOTP */
export async function verifyOTP(req, res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP
        req.app.locals.resetSession = true; // start the session for reset password
        return res.status(201).send({ msg: "verify Successfully!" })
    }
    return res.status(400).send({ error: "Invalid OTP" });
   
    
    // res.json('verifyOTP route');
} 


// successfully redirect user when OTP is valid
/** GET http://localhost:8000/api/createResetSession */
export async function createResetSession(req, res){
    if(reqapp.locals.resetSession){
        req.app.locals.resetSession = false; // allow access to this route only once
        return res.status(201).send({ msg: "access granted!" })
    }
   return res.status(440).send({ error: "Session expired!" })
   // res.json('verifyOTP route');
} 


/** GET  http://localhost:8000/api/verifyOTP */
export async function resetPassword(req, res){
    try {
        if(!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!"});
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username })
        if(user){
          const hashedPassword =  bcrypt.hash(password, 10)
          if(hashedPassword){
          const newUser =  await UserModel.updateOne({ username: user.username }, {password: hashedPassword });
            if(newUser){
                res.status(201).send({ msg: "Password Updated Successfully..."})
            }else{
               return new Error; 
            }
          }else{
            res.status(404).send({ error: "Error in hashing password"})
          }
        }else{
            return res.status(500).send({ error: "Unable to Hash Passsword "})
        }        

    }catch(error){
       return res.status(404).send({ error: "Username not found" })
    }
    
    
    
    
    res.json('resetPassword route');



}









