const express = require('express');
const router = express.Router();
const { ensureAuthenticated,forwardAuthenticated } = require('../config/auth');
const SignUp = require('../models/Signup');
const Templates=require('../models/templateModels');
const print = require("./const").print;
const time = require("./const").tConvert;
let currentuser={};

router.get('/',forwardAuthenticated,(req,res)=>{
    res.render('login',{title:'Login'});
})
// // Dashboard
router.get('/Dashboard',ensureAuthenticated, (req, res) =>{
    
    currentuser = req.user;
    if(currentuser){
        Templates.find({current_user : currentuser._id},(err,data)=>{
            if (err) throw err;
            else 
            {
                date_list=[];
                data_ids = [];

                for(let i=0;i<data.length;i++){
                    
                    let new_date = Date(data[i].date).substr(0,25)
                    let userid = data[i]._id;
                    data_ids.push(userid);
                    date_list.push(new_date);
                }
                
                res.status(200).render('Dashboard',{title:"Dashboard",currentuser,data,date_list,data_ids});
            }
            
        });
    }
});

module.exports=router;
