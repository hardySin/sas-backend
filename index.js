// require('dotenv').config()

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const http = require("http").createServer(app);
const PORT = 4000
const io = require('socket.io')(http,{
  cors: {
    origin: "http://localhost:3000",
   }  
})
 dotenv.config();
 const initializeDB= require('./dbCo  nnect')
const mainRouter=require('./routerMain')
var bodyParser = require('body-parser');
const formidable = require('express-formidable');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const intializeSocket = require('./socket.io');
 

http.listen(PORT, async() =>
  {
    console.log(`Listening on port 4000`)
     await initializeDB();
   
     intializeSocket(io)
     } );

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json());
app.use(cookieParser())
 
app.use('/api', mainRouter);

  
