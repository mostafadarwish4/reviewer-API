//used import instead require because we add key "type" to module
const express=require('express')
const cors =require('cors')
const restaurants =require('./api/restaurants.route.js')

const app=express()

app.use(cors())
app.use(express.json())

//initial or only route
app.use('/restaurants',restaurants)

//if any other routes 
app.use('*',(req,res)=>res.status(404).json({error:'Not found'}))

module.exports=app
