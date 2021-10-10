const print=(val="")=>{
    console.log(val);
}

const endsession=()=>{
    currentuser={};
    if(currentuser!={} || typeof(currentuser)!='undefined'){
        currentuser=undefined;
    }
}

const  tConvert = (time)=> 
{
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}
   
const Templates =require('../models/templateModels');

const template_creation=(id,current_user,t_name,t_color,t_path,pdf_path,first_name,
  last_name,Email,Phone,address,Objective,skill_1,skill_2,skill_3,
  When,Where,Desig,When2,Where2,Desig2,When3,Where3,Desig3,edu,field,degree,edu2,field2,degree2,edu3,field3,degree3,
  int_1,int_2,int_3)=>{
    Templates.insertMany({id:id,
        current_user:current_user,
        t_name:t_name,
        t_color:t_color,t_path:t_path,pdf_path:pdf_path,FName:first_name,
        LName:last_name,Email:Email,Phone:Phone,address:address,
        Objective:Objective,skill_1:skill_1,skill_2:skill_2,skill_3:skill_3,
        When : When, Where : Where,Desig : Desig,When2 : When2,Where2 : Where2,
        Desig2:Desig2, When3 : When3, Where3 : Where3, Desig3 : Desig3,
        edu:edu,degree:degree,field:field,edu2:edu2,degree2:degree2,field2:field2,
        edu3:edu3,degree3:degree3,field3:field3,
        int_1:int_1,int_2:int_2,int_3:int_3
        },(err)=>{
        if(err)throw err;
        else{
            print('success')
        }
    });
}

const findTemplateById=(id)=>{
    Templates.find({_id:id},(err,data)=>{
        
        if (err) throw err;
        else{
            return data;
        }
    });
}

const colors={
    Dark_red:'rgb(134, 17, 17)',
    Dark_green:'rgb(44, 83, 12)',
    dark_blue:'#1a4567',
    black:'black',
    dark_grey:'rgb(80, 74, 74)'
}

const ColorNames={
    'Dark Red' : colors.Dark_red,
    'Green sharp' : colors.Dark_green,
    'Black' : colors.black,
    'Dark Blue' : colors.dark_blue
}

function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const replaceAll =(str, term, replacement)=> {
  return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

const replaceByGap = (data)=>{

  var res = replaceAll(data,"%20", " ");   
  return res;   
}
//print(replaceByGap('%20jb%20jgjd%20va%20fa%20fa'));

module.exports={print,endsession,colors,template_creation,findTemplateById,tConvert,ColorNames,replaceByGap};

