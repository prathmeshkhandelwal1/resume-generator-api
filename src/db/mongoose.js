const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/resume-generator' , {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>console.log('DB connected!'))
.catch((e)=>{
    return console.log(e)
})
