const express = require('express')
require('dotenv').config()
require('./Database/Connection')


// middleware
const bodyParser = require('body-parser')

 // routes
const TestRoute = require('./route/testroute')
const CategoryRoute = require('./route/categoryRoute')
const ProductRoute = require('./route/productRoute')
const UserRoute = require('./route/userRoute')


const app = express()
const port = process.env.PORT || 8000

// middleware
app.use(bodyParser.json())

// app.get('/hello',(request, response) => {
//     response.send("Hello World!!!")
// })

// app.get('/second',(req,res)=>{
//     res.send("this is second message")
// } )

// use routes

app.use('/api',TestRoute)
app.use('/api', CategoryRoute)
app.use('/api', ProductRoute)
app.use('/api', UserRoute)

app.listen(port, () =>{
    console.log(`App started at port ${port}`)
})