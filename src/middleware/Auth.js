const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        console.log(token)
        const decoded =  jwt.verify(token,'console.log')
        console.log(decoded)
        const user = await  User.findOne({_id: decoded._id, 'tokens.token':token })
        console.log(user)
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(401).send('Plz Authorize')
    }
}

module.exports = auth