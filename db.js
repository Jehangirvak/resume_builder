const mongoose=require('mongoose');
const url =require('../config/keys').uri;
const status=require('../config/keys').status;
mongoose.connect(url,status,(err)=>
{
    if(!err){
        console.log("connected")
    }

    else{
        console.log(err);
        console.log("error connecting")
    }
});
