const express = require('express');
const router = express.Router();
const { ensureAuthenticated,forwardAuthenticated } = require('../config/auth');
const Templates = require('../models/templateModels');
const print = require('./const').print;
const path = require('path');
let ejs = require("ejs");
const mongoose = require('mongoose');
const create_template = require('./const').template_creation;
const colors = require('./const').colors;
const mypdf = require('html-pdf');
const pdf = require('express-pdf');
var url = require('url');
let currentuser={};

router.get('/:id?',ensureAuthenticated,(req,res)=>{
    currentuser = req.user;
    var myurl = url.parse(req.url);
    var biodata=myurl.query;
    print(biodata)   
    mypath=myurl.pathname;
    let template_number = mypath[1];
    let template_color =mypath.substr(3,);
    if(biodata){
        biodata = JSON.parse('{"' + decodeURI(biodata).replace(/"/g, '\\"').replace(/&/g, '","').replace(/%20/g, '" "').replace(/=/g,'":"') + '"}');
        print(biodata);
    }

    if(biodata==null){
        biodata={
            FName:'Johnson'.toUpperCase(),
            LName:'William'.toUpperCase(),
            Email:'john_smith@gmail.com'
        }
        if(currentuser){
            biodata.FName = currentuser.first_name.toUpperCase();
            biodata.LName = currentuser.last_name.toUpperCase();
            biodata.Email = currentuser.email;
            biodata.Phone = currentuser.Phone;
            biodata.Where2 = '';
            biodata.skill_2 = '';
            biodata.edu2 = '';
        }
        
    }

    if(template_color=='red'){
        template_color=colors.Dark_red;
        // mypdfvar set to these conditions so that every template will got a different name
    }
    else if(template_color=='black'){
        template_color=colors.black;
    }
    else if(template_color=='green'){
        template_color=colors.Dark_green;
        
    }
    else if(template_color=='blue'){
        template_color=colors.dark_blue;
    }

    res.status(200).render('main_template.ejs',{title:'MyResume',currentuser,biodata,template_number:template_number,template_color:template_color})
        
});
router.post('/my',(req,res)=>{
    print(req.body);
  
})
    
router.post('/:id?',(req,res)=>{
        currentuser=req.user;
        let appuser=req.body;
        var myurl = url.parse(req.url);
        mypath=myurl.pathname;
        let template_number = mypath[1];
        mypdfpath=mypath.substr(1,);
        var urldata=myurl.query;  
        appuser.FName=appuser.FName.toUpperCase();
        appuser.LName=appuser.LName.toUpperCase();
        print(appuser)
        var pdfname=appuser.FName + ' '+appuser.LName;
        var FileName = pdfname;
        let mycol = appuser.myradio;
        let ejsfilename;
        
        if(mycol===colors.Dark_red){
            
            ejsfilename= template_number +'_red.ejs';
            colorname='Dark Red';
            mypdfpath = template_number +'_red';

        }
        
        else if(mycol===colors.Dark_green){
            colorname='Green sharp';
            ejsfilename= template_number +'_green.ejs';
            mypdfpath = template_number +'_green';
        }
        
        else if(mycol===colors.black){
            ejsfilename= template_number +'_black.ejs';
            colorname='Black';
            mypdfpath = template_number +'_black';
        }
        else if (mycol===colors.dark_blue){
            ejsfilename= template_number +'_blue.ejs';
            colorname='Dark Blue';
            mypdfpath= template_number +'_blue';
            
        }

        if(ejsfilename){
            if(urldata!=null)
                biodata = JSON.parse('{"' + decodeURI(urldata).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
            pdfnamelen = pdfname.length;
                Templates.find({pdf_path:{ $regex: '.*' + pdfname + '.*' },current_user:currentuser._id},(err,data)=>{
                    if(err) throw err;
                    else if(data){
                      let initialname;
                        // yes
                        for(i=0;i<data.length;i++){
                            pdfname_len=data[i].pdf_path.length;
                            pdfname =data[i].pdf_path.substr(0,pdfname_len-4);
                            
                            if (pdfname.includes(i+1)){
                                initialname=data[i].pdf_path.substr(0,pdfname_len-2);
                                
                            }
                            else{
                                initialname=data[i].pdf_path/*.substr(0,pdfname_len-4)*/;
                                
                            }
                            pdfname = initialname;
                            FileName =initialname+'_'+parseInt(i+1);
                            // if(data.length==1)
                            //   if(urldata!=null)
                            //     pdfname = biodata.pdf_path;
                            //     FileName =pdfname
                        }
                        
                    }
                    else{
                        pdfname=appuser.FName+appuser.LName;
                        FileName=pdfname;
                    }
                    
                });
                
                ejs.renderFile(path.join(__dirname, '../templates/', ejsfilename), {appuser: appuser}, (err, data) => {
                    if (err) throw err;
                    else {
                        let options = {
                            "height": "11.25in", //setting A4 size page
                            "width": "8.5in"
                    };
                    
                    mypdf.create(data,options).toFile(path.resolve(__dirname, '../user_templates/'+ FileName+'.pdf'),
                    (err,data2)=>{
                        if (err) throw err;
                        if(data2) {
                            if(!currentuser){
                                req.logout()
                                req.flash("You Need To Login Again!");
                            }
                            if(currentuser){
                                    let Email = appuser.Email;
                                    let obj = appuser.obj;
                                    let address =appuser.address;
                                    let when = appuser.when;
                                    let where = appuser.where;
                                    let desig =appuser.Desig;
                                    let when2 = appuser.when2;
                                    let where2 = appuser.where2;
                                    let desig2 =appuser.Desig2;
                                    let when3 = appuser.when3;
                                    let where3 = appuser.where3;
                                    let desig3 =appuser.Desig3;
                                    let skill_1 =appuser.skill_1;
                                    let skill_2 =appuser.skill_2;
                                    let skill_3 =appuser.skill_3;
                                    let edu = appuser.edu;
                                    let field = appuser.field;
                                    let degree =appuser.degree;
                                    let edu2 = appuser.edu2;
                                    let field2 = appuser.field2;
                                    let degree2 =appuser.degree2;
                                    let edu3 = appuser.edu3;
                                    let field3 = appuser.field3;
                                    let degree3 =appuser.degree3;
                                    let int_1 =appuser.int_1;
                                    let int_2 =appuser.int_2;
                                    let int_3 =appuser.int_3;
                                if(urldata){
                                  
                                    let update_tmp={
                                        id:mypdfpath,
                                        t_name:FileName,
                                        t_color:colorname,
                                        pdf_path:pdfname,
                                        FName:appuser.FName,
                                        LName:appuser.LName,
                                        Email:appuser.Email,
                                        Phone:appuser.Phone, 
                                        address: address,
                                        Objective: obj,
                                        skill_1: skill_1,
                                        skill_2: skill_2,
                                        skill_3: skill_3,
                                        When: when,
                                        Where: where,
                                        Desig: desig,
                                        When2: when2,
                                        Where2: where2,
                                        Desig2: desig2,
                                        When3: when3,
                                        Where3: where3,
                                        Desig3: desig3,
                                        edu: edu,
                                        degree: degree,
                                        field: field,
                                        edu2: edu2,
                                        degree2: degree2,
                                        field2: field2,
                                        edu3: edu3,
                                        degree3: degree3,
                                        field3: field3,
                                        int_1: int_1,
                                        int_2: int_2,
                                        int_3: int_3,
                                        date:Date.now()
                                    }
                                    
                                    Templates.updateOne({_id:biodata._id}, update_tmp, function(err, template) {
                                        if(err) throw err;
                                        if(template)
                                            return;
                                        
                                    });

                                }
                                else{
                                    
                                    create_template(mypdfpath,currentuser._id,
                                      FileName,colorname,ejsfilename,pdfname+'.pdf',
                                      appuser.FName,appuser.LName,appuser.Email,
                                      appuser.Phone,appuser.address,obj,skill_1,skill_2,skill_3,
                                      when,where,desig,when2,where2,desig2,when3,where3,desig3,
                                      edu,field,degree,edu2,field2,degree2,edu3,field3,degree3,int_1,int_2,int_3)
                                     
                                }
                                
                            }
                            else{
                                req.flash("error_msg","something went wrong")
                            }

                        res.redirect('/login/Dashboard');
                    }
                });
                
            }
            
        });
    
    }
    ////////                 if ends here below                ////////
    else{
        res.redirect('/templates');
        req.flash('error_msg','That source is not available');
    } 
});

router.get('/del/:id?',(req,res)=>{
    ID=req.url.substr(5,);
    Templates.deleteMany({_id:ID},(err)=>{
        if(err)throw err;
        else{
            req.flash("success_msg","PDF file Deleted Successfully!");
            res.redirect("/login/Dashboard");
        }
    });
});

const ColorNames = require('./const').ColorNames;
router.get('/template_edit_id/:id?',ensureAuthenticated,(req,res)=>{
    ID = req.url.substr(18,);
    currentuser = req.user 
    if(currentuser){

        Templates.find({_id:ID,current_user:currentuser._id},(err,data)=>{
            if(data){
                biodata = data[0];
                let path = biodata.t_path
                pathlen = path.length;
                path = path.substr(0,pathlen-4);
                path = biodata.id;
              
                   let skill_1 = biodata.skill_1;
                   let skill_2 = biodata.skill_2;
                   let skill_3 = biodata.skill_3;
                   
                    let when = biodata.When;
                    let where = biodata.Where;
                    let Desig = biodata.Desig;
                    let when2 = biodata.When2;
                    let where2 = biodata.Where2;
                    let Desig2 = biodata.Desig2;
                    let when3 = biodata.When3;
                    let where3 = biodata.Where3;
                    let Desig3 = biodata.Desig3;
                 
                    let edu = biodata.edu;
                    let degree = biodata.degree;
                    let field = biodata.field;
                    let edu2 = biodata.edu2;
                    let degree2 = biodata.degree2;
                    let field2 = biodata.field2;
                    let edu3 = biodata.edu3;
                    let degree3 = biodata.degree3;
                    let field3 = biodata.field3;
                   
                    let int_1 = biodata.int_1;
                    let int_2 = biodata.int_2;
                    let int_3 = biodata.int_3;
              
                res.redirect('/templates/'+path+
                '?_id='+biodata._id+'&FName='+biodata.FName+
                '&LName='+biodata.LName+'&Email='+biodata.Email+'&Phone='+biodata.Phone+
                '&address='+biodata.address+'&obj='+biodata.Objective+
                '&int_1='+int_1+'&int_2='+int_2+'&int_3='+int_3+
                '&edu='+edu+'&degree='+degree+'&field='+field+
                '&edu2='+edu2+'&degree2='+degree2+'&field2='+field2+
                '&edu3='+edu3+'&degree3='+degree3+'&field3='+field3+
                '&When='+when+'&Where='+where + '&Desig='+Desig+
                '&When2='+when2+'&Where2='+where2 + '&Desig2='+Desig2+
                '&When3='+when3+'&Where3='+where3 + '&Desig3='+Desig3+
                '&skill_1='+skill_1+'&skill_2='+skill_2+'&skill_3='+skill_3
                );
            }
        });
    }
    else{
        req.logout()
        res.redirect('/login');
        req.flash("You have to Login first")
    }
});

module.exports = router;
