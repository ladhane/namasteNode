const express = require ('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const connectionRouter = require('./routes/connection');
const server = express();

server.use(express.json());
server.use(cookieParser());

server.use('/',authRouter);
server.use('/',profileRouter);
server.use('/',connectionRouter);

connectDB().then(()=>{
    console.log('Database connection established successfully')
    server.listen(3000,()=>{
    console.log('Server running successfully on port 3000')
    })
}).catch((err)=>{
    console.log('Issue connecting to DB',err)
})