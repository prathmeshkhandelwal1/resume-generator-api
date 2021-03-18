const mongoose = require('mongoose')
const validator = require('validator')

const Details = mongoose.model('details',{
    gmail:{
        type:String,
        trim:true,
    },
    address:{
        type:String,
        trim:true,
    }
})

module.exports = Details