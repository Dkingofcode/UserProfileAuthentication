import nodemailer from 'nodemailer';
import Mailgen from "mailgen";

import ENV from '../config.js';
import { register } from './appController.js';

// https://ethereal.email/create
let nodeConfig = {
    host: "http.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: ENV.EMAIL, // generate ethereal email
        pass: ENV.PASSWORD  // generate ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
})

/**  POST: http://localhost.8000/api/registerMail 
 * @param: {
 *  "username": "example123",
 *  "userEmail": "admin123",
 *   "text": "",
 *   "subject": "", 
 * }
 * 
 * 
 * 
*/




export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    // body of the email
    var email = {
       body: {
          name: username,
          intro: text || 'Welcome to My world, So very excited to have you on baord',
          outro: "Need help, or have questions, Just reply to this email, we'd love to hear from you"
       }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successful",
        html: emailBody
    }

    // send email
   const Gmail = await transporter.sendMail(message);
    if(Gmail) {
        return res.status(200).send({ msg: "You shold recieve an email from us."})

    } else{
        return res.status(500).send({ error: error });
    }

}











