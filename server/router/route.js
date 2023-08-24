import { Router } from "express";
import Auth from "../middleware/auth.js";
// import all controllers
import * as controller from '../controllers/appController.js'; 

const router = Router();


/** POST request */
router.route('/register').post(controller.register);  // register user
router.route('/registerMail').post(); // send the email
router.route('/authenticate').post((req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in app

/** GET request */
router.route('/user/:username').get(controller.getUser)  // user with username
router.route('/generateOTP').get(controller.generateOTP)  // generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP)  // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession)  // reset all the variables


/** PUT request */
router.route('/updateuser').put(Auth, controller.updateUser); // is used to update the user profile
router.route('/resetPassword').put(controller.resetPassword); // use to reset password



/**  Delete request  */


export default router;
























