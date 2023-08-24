import jwt from 'jsonwebtoken';
import ENV from '../config.js';

export default async function Auth(req, res, next) {
    try {
        const payload = {id: req.query.id};
        const token = jwt.sign(payload, ENV.JWT_SECRET, {expiresIn: '1h'});
        console.log(payload, token);
        const clientToken = req.headers.authorization.split(" ")[1];
        console.log("**********");
        console.log(clientToken);
        const verifyToken = jwt.verify(token, ENV.JWT_SECRET);

        if(verifyToken)
        {
            req.user = verifyToken;
            return res.json(verifyToken);
            next();
        }
        // if (!token) {
        //     throw new Error('Authentication failed!');
        //   }
        // // retrieve this user details to the logged in user
        // const decodetoken =  jwt.verify(token, ENV.JWT_SECRET);
        // req.user = decodetoken;
        // // res.json(token);
        // console.log(decodetoken);
        // // Proceed to the next middleware or route handler
        // next();
    } catch (err) {
        console.error("Authentication Error:", err);
        return res.status(401).json({ error: err.message });
    }
}
