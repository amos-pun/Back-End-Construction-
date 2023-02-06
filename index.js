const express = require('express')
require('dotenv').config()
require('./Database/Connection')


// middleware
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

 // routes
const TestRoute = require('./route/testroute')
const CategoryRoute = require('./route/categoryRoute')
const ProductRoute = require('./route/productRoute')
const UserRoute = require('./route/userRoute')
const OrderRoute = require('./route/orderRoute')


const app = express()
const port = process.env.PORT || 8000

// middleware
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

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
app.use('/api', OrderRoute)
app.use('/api/public/uploads',express.static('public/uploads'))

app.listen(port, () =>{
    console.log(`App started at port ${port}`)
})