const mongoose=require('mongoose');
const {Schema} = mongoose;

const  UserSchema= new Schema ({

     name:{
        type:String,
        required:true,
     },

     email:{
        type:String,
        required:true,
        //unique:true
     },

     password:{
        type:String,
        required:true,
     },

     date:{
        type:Date,
        default:Date.now,
     }
        
});

// now how to export this

module.exports = mongoose.model('user',UserSchema);

//this is how y create schema in node js
