const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT
const userRouter = require('./src/routers/user')
const detailsRouter = require('./src/routers/details')
require('./src/db/mongoose')

app.use(express.json());
app.use(userRouter)
app.use(detailsRouter)


app.listen(PORT, ()=> {
    console.log(`Server is up on port: ${PORT}`)
})