const express=require('express')
const restaurants =require('./api/restaurants.route.js')
const app=express()

app.use(express.json())
app.use('/restaurants',restaurants)
app.use('*',(req,res)=>res.status(404).json({error:'Not found'}))

module.exports=app
