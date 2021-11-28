var jwt = require('jsonwebtoken');
var config = require('../config.js');
const JWT_SECRET=config.jwt_secret;

const fetchuser=(req,res,next)=>{
    //get the user from jwt token and add id to req object:
    const token=req.header('auth-token');  //taking auth-token from the request
    if(!token){
        res.status(401).json({"error":"Authentication error"});
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        //now data contains the data that was used to generate jwt
        req.user=data.user; //adding id field to req object
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error:"1Authentication error"});
    }
    
}

module.exports=fetchuser;