const mongoose = require('mongoose')
const validator = require('validator')

const Details = mongoose.model('details',{
    name: {
        type: String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
    },
    address:{
        type:String,
        trim:true,
    },
    phone:{
        type:Number
    },
    profession:{
        type: String,
        trim:true
    },
    summary:{
        type:String,
        trim:true
    },
    educationDetails:{
        institute:{
            type: String,
            trim:true
        },
        Degree:{
            type:String,
            trim:true
        },
        Branch:{
            type:String,
            trim:true
        },
        startDate:{
            type:String,
            trim:true,
        },  
        endDate:{
            type:String,
            trim:true
        },
        seniorSec:{
            type:String,
            trim:true
        },
        percentage:{
            type:Number
        },
        sec:{
            type:String,
            trim:true
        },
        CGPA:{
            type:Number
        }
    },
    skills:{
        tools:{
            type:String,
            trim:true
        },
        program:{
            type:String,
            trim:true
        }
    },      
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports = Details