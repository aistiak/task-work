const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://arif:secret1234@cluster0.nvg48.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())
app.use(cors())

const alienRouter = require('./routes/aliens')
const authRouter = require('./routes/auth')
const blogRouter = require('./routes/blog')
const usersRouter = require('./routes/users')
app.use('/aliens',alienRouter)
app.use('/auth',authRouter)
app.use('/blog',blogRouter)
app.use('/users',usersRouter)

app.listen(9000, () => {
    console.log('Server started')
})