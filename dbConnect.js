const db= require('./keyurl').mongoURI;
const mongoose = require('mongoose');
 const connection=async()=> {
    
    await mongoose.connect(db,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
             useFindAndModify: false 
        }, (err,client)=>{
        if(!err) {  

            console.log("connected to DB")
         }
         else
         {
            console.log("error",err);
          }
     })
}
module.exports=connection;