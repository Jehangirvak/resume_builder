const express=require('express');
const router = express.Router();
const print = require('./const').print;
//print function in console.log in js and is you use it inside ejs files they will print the designed page
const bcrypt=require('bcryptjs');
const Signup=require('../models/Signup');
const passport=require('passport');
//logout endsession
const Templates =require("../models/templateModels");
const endsession=require('./const').endsession;

const { ensureAuthenticated,forwardAuthenticated } = require('../config/auth');
let details={};
router.get('/',(req,res)=>{
currentuser=req.user;
res.status(200).render('index',{title:'Home',currentuser});
});


router.get('/templates',(req,res)=>{
    
    currentuser=req.user;
    
    res.status(200).render('template',{title:"Templates",currentuser});
});
router.get('/examples',(req,res)=>{
    currentuser=req.user;
    
    res.status(200).render('examples',{title:"Examples",currentuser});
});

router.get('/privacy',(req,res)=>{
    currentuser = req.user;
    res.status(200).render('privacy',{title:"Privacy",currentuser});

})


// Register Page
router.get('/signup',forwardAuthenticated,(req,res)=>{
    currentuser=req.user;

res.status(200).render('signup',{title:"Signup",details,currentuser});
})

router.post('/signup',(req,res)=>{
    let details={
        first_name:req.body.F_name,
        last_name:req.body.L_name,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone
    };
    const { first_name,last_name, email, password,phone } = req.body;
    let errors = [];
    
    if (first_name==''||last_name==''||email=='' ||password==''||phone=='') {
        errors.push({ msg: 'Please enter all fields' });
    }
    
    // if (password != password2) {
    //   errors.push({ msg: 'Passwords do not match' });
    // }
    
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    
    if (errors.length > 0) {
        res.render('signup', {title:'Signup',details,errors});
    } else {
        Signup.findOne({ email: email }).then(user => {
        if (user) {
            errors.push({ msg: 'Email already exists' });
            res.render('signup', {title:'Signup',details,errors});
        } else {
            const newUser = new Signup(
                details
            );
            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                .save()
                 .then(user => {
                //     print(user);
                    req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                    );
                    res.redirect('/login');
                })
                .catch(err => console.log(err));
            });
            });
        }
        });
    }
    });


// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/login/Dashboard',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  });
  
router.get('/terminate',(req,res)=>{
    currentuser = req.user;
    if(currentuser){
        ID = currentuser._id; 
        print(currentuser);
        print(ID);
        Templates.deleteMany({current_user:ID},(err)=>{
            if(err)throw err;
            
        });
        Signup.deleteMany({_id:ID},(err)=>{
            if (err) throw err;
            req.logout();
        });
        req.flash("success_msg","Your Account is terminated !");
        res.redirect("/login");
    }
    else
        req.flash("error_msg","you are not logged in yet!")
        res.redirect("/login");
    
});

// Logout
router.get('/logout', (req, res) => {
    //ending the session of user
    endsession();
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });;



const login=require('./login');
router.use('/login',login);
router.use('/login/',login);
const templates = require('./template');
router.use('/templates',templates);
router.use('/templates/',templates);



module.exports=router;
