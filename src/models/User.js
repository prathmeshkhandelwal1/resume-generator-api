const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        validate(value){
            if(value==="password"){
                throw new Error("Password is invalid!")
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
}
)


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    // console.log(user.password)
    let isMatch = await bcrypt.compare(password, user.password)
    // console.log(isMatch)    
    if(!isMatch){
        throw new Error('unable to login')
    }
    return user
}

//for generating auth tokens

userSchema.methods.generateAuthToken = async function (){
    const user = this
    console.log(user.tokens)
    const token = jwt.sign({ _id: user._id.toString()}, 'console.log')
    console.log(token)
    user.tokens = user.tokens.concat({token:token})
    console.log(user.tokens)
    return token
}


// for hashing the password whenever the password will be modify.
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})


const User= mongoose.model('User', userSchema)



module.exports = User
