const connecttomongo=require('./db');
const express=require('express');


const app=express();

app.use(express.json());  //middleware

connecttomongo();

//use to use routes

app.use('/api/user',require('./routes/user.js'));

app.listen(3000,()=>{
    console.log("Lisen");
})


