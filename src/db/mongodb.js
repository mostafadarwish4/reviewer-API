const mongodb=require('mongodb')

const MongoClient=mongodb.MongoClient
MongoClient.connect(process.env.MONGODB_URL,
    {useNewUrlParser:true,
     useUnifiedTopology: true})
     .then(client=>{
         //create our database on server if does not exist and manipulte with it 
        console.log(client)
         module.exports=client
        })
.catch(e=> console.log('Unable to connect to your database'))
   
