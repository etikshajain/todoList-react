const express=require('express');
const router=express.Router();
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');
//importing user model:
const User = require('../models/User');
const config=require('../config');

//express validator
const { body, validationResult } = require('express-validator');

//hashing
var bcrypt = require('bcryptjs');
var salt =bcrypt.genSaltSync(10);

//WEB TOKEN:
const JWT_SECRET=config.jwt_secret;

//ROUTE1: create a user using: POST 'api/auth/' doesnot require authentication, no login required
router.post('/createuser',[
    body('name','Enter a valid name!').isLength({ min: 3 }),
    body('email','Enter a avalid Email').isEmail(),
    body('password','Enter a valid password').isLength({ min: 5 })],
    async (req,res)=>{
    let success=false;
    //if there are errorrs return errors array object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false;
      return res.status(400).json({ success,errors: errors.array() });
    }

    try{

    //checking if the email is already registered:
    let user=await User.findOne({email:req.body.email});
    if(user){
        success=false;
        return res.status(400).json({success,error:"This email is already registered"});
    }

    //creating new user object:
    //creating hash of password
    let secPsw=await bcrypt.hash(req.body.password,salt); 
    user=await User.create({
        name: req.body.name,
        password: secPsw,
        email: req.body.email
      })

    //generating jwt as response:
    const data={
        user:{
            id:user.id
        }
    }
    // res.json({"Nice":"You have been registered"});
    var token = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success,"token":token});
    }
    catch(err){
        console.log(err);
        success=false;
        res.status(500).json({success,error:"Some error occured."});
    }
});


//ROUTE2: authenticating a user using: POST: /api/auth/login -no login required
router.post('/login',[
    body('email','Enter a avalid Email').isEmail(),
    body('password','Password cannot be blank').exists({ min: 1 })],
    async (req,res)=>{
    let success=false;
    //if there are errorrs return errors array object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false;
      return res.status(400).json({ success,errors: errors.array() });
    }

    try{
        const {email,password}=req.body;
        let user=await User.findOne({email:email});
        if(!user){
            success=false;
            return res.status(400).json({success,error:"Incorrect credentials, please try again!"});
        }
        //checkign passwords:
        const comparePsws=await bcrypt.compare(password,user.password);
        if(!comparePsws){
            success=false;
            return res.status(400).json({success,error:"Incorrect credentials, please try again!"});
        }
        //if password is correct, we need to check the token:
        const payload={
            user:{
                id:user.id
            }
        }
        var token = jwt.sign(payload, JWT_SECRET);
        success=true;
        res.json({success,"token":token});

    }
    catch(err){
        success=false;
        res.status(500).json({success,error:"Some error occured."});
    }
});

//get logged in user's details: POST: "api/auth/getUser"-login required
router.post('/getUser',fetchuser,async (req,res)=>{
    let success=false;
    try{
        //getting user id from req through fetchuser middleware:
        const userID=req.user.id;
        //displaying all fields except password
        const user=await User.findById(userID).select("-password");
        res.json({success,user});
    }
    catch(err){
        success=false;
        res.status(500).json({success,error:"Some error occured."});
    }
});


module.exports=router;