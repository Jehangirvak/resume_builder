require('../database/db');
const mongoose = require('mongoose');
const SignupSchema= new mongoose.Schema({
    first_name:
    {type:String},
    last_name:
    {type:String},
    email:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const Signup= mongoose.model('SignUp',SignupSchema);
module.exports=Signup;