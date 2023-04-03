const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require ('bcrypt');
var jwt = require('jsonwebtoken');
var JWT_SECRET='Utpalis@goodboy';


//CreaeAuserendpoint 

router.post('/createuser',

body('name','Enter a valid name').isLength({ min: 3}),
body('email','Enter a valid email').isEmail(),
body('password','Enter a valid password').isLength({ min: 5 }),

//done express-validator

async (req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }//erros length //return bad status
  //checking validation

  try{

  //check user exist in yr dataabse or not..
  
       let user= await User.findOne({email:req.body.email});

       if(user){
            res.status(400).json({error:"Sorry user with this email already exist"});
       }

       else{
 
           //adding salt to password

           const salt=await bcrypt.genSalt(10);
           const secpass=await bcrypt.hash(req.body.password,salt);
 

           let user=await User.create({
              name: req.body.name,
              password: secpass,
              email: req.body.email,
           })
          //user ban gya
           const data ={
               user:{
                  id:user.id
               }
           }
          
          var authtoken = jwt.sign(data, JWT_SECRET);
          console.log(authtoken);
        
          res.json({"authtoken":authtoken});


       }//else 

  }//try block ends 

  catch(err){
    console.log(err.message);
    res.status(500).json({error:"Some error occured"});
  }


  //user stored credentials validate and unique ka kaam kiya 


});
// that how y send your data into database



// login of a user endpoint and authenticate


router.post('/loginuser',

    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),

async (req,res)=>{

       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
       }//erros length //return bad status
  
  
       //array destructuring
 
      const {email,password}=req.body;

      try{
            let user=await User.findOne({email});
            if(!user){
               return res.status(400).json({"error":"Try to login with correct credentials."});
            }

            const passwordCompare=await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                 return res.status(400).json({"error":"Try to login with correct credentials."});
            }

            const data ={
               user:{
                 id:user.id
               }
            }
         
            var authtoken = jwt.sign(data, JWT_SECRET);
            console.log(authtoken);
       
            res.json({"authtoken":authtoken});
        
      }
     //try ends 

      catch(error){
           console.log(error.message);
           res.status(500).json({error:" Internal Server error occured"});
      }//catch

  
})


module.exports=router