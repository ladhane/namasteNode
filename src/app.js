const express = require ('express');
const server = express();

const responseHandler1 = (req, res, next)=>{
    console.log('Response from handler 1');
    // res.send('Response 1')
    next()
}

const responseHandler2 = (req,res,next)=>{
    console.log('Response from handler 2')
    // res.send('response 2')
    next()
}

const responseHandler3 = (req,res,next)=>{
    console.log('Response from handler 3')
    // res.send('response 3')
    next()
}

const responseHandler4 = (req,res,next)=>{
    console.log('Response from handler 4')
    res.send('response 4')
    // next()
}


server.get(
    '/user', 
    [responseHandler1, 
    responseHandler2], 
    [responseHandler3,
    responseHandler4]
)

server.listen(3000,()=>{
    console.log('Server running successfully on port 3000')
})