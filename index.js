const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT
const userRouter = require('./src/routers/user')
const detailsRouter = require('./src/routers/details')
const cors = require('cors')
require('./src/db/mongoose')


app.use(cors())
app.use(express.json());
app.use(userRouter)
app.use(detailsRouter)

app.listen(PORT, ()=> {
    console.log(`Server is up on port: ${PORT}`)
})