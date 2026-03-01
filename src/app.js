const express = require ('express');
const server = express();
server.use('/test',(req,res)=>{
    res.send('Hello from express test request handler');
})
server.use('/hello',(req,res)=>{
    res.send('Hello from express hello request handler');
})
server.use((req,res)=>{
    res.send('Hello from express server');
})
server.listen(3000,()=>{
    console.log('Server running successfully on port 3000')
})