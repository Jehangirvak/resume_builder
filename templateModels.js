require('../database/db');

const mongoose = require('mongoose');
const TemplatesSchema= new mongoose.Schema({

    id:{
        type:String
    },

    current_user:{
        type:String
    },

    t_name:{
        type:String
    },

    t_color:{
        type:String    
    },

    t_path:{
        type:String
    },

    pdf_path:{
        type:String
    },
    FName:{
        type:String
    },
    LName:{
        type:String
    },
    Email:{
        type:String
    },
    Phone:{
        type:String
    },
    address:{
        type:String  
    },
    Objective:{
        type:String
    },
    skill_1 :{
        type: String
    },
    skill_2:{
        type:String
    },
    skill_3:{
        type:String
    },
    When :{
        type: String
    },
    Where:{
        type:String
    },
    Desig:{
        type:String 
    },
    When2:{
        type: String
    },
    Where2:{
        type:String
    },
    Desig2:{
        type:String
    },
    When3:{
        type: String
    },
    Where3:{
        type:String
    },
    Desig3:{
        type:String
    },
    edu:{
        type:String
    },
    degree:{
        type:String
    },
    field:{
        type:String
    },
    edu2:{
        type:String
    },
    degree2:{
        type:String
    },
    field2:{
        type:String
    },
    edu3:{
        type:String
    },
    degree3:{
        type:String
    },
    field3:{
        type:String
    },
    int_1:{
        type:String
    },
    int_2:{
        type:String
    },
    int_3:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }

});

const Templates= mongoose.model('Templates',TemplatesSchema);
module.exports=Templates;