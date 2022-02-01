const app=require('./server')
const mongodb=require('mongodb')
const restaurantsDAO=require('./dao/restaurantsDAO')
const reviewsDAO = require('./dao/reviewsDAO')


const PORT=process.env.PORT

const MongoClient=mongodb.MongoClient
MongoClient.connect(process.env.MONGODB_URL,
    {useNewUrlParser:true,
     useUnifiedTopology: true})
     .then(async client=>{
        await restaurantsDAO.injectDB(client)
        await reviewsDAO.injectDB(client)
        })
        .catch(e=> console.log('Unable to connect to your database'+e))
   
    app.listen(PORT,()=>{
        console.log('Server is up on port '+PORT)
    })

