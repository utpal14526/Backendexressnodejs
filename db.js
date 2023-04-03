const mongoose=require('mongoose');


const URI="mongodb://localhost:27017/inotebook";

const connecttomongo=()=>{
    mongoose.connect(URI,()=>{
        console.log("Connected to Mongo");
    })
}

module.exports=connecttomongo;   