const express = require ('express');
const server = express();
const { isAdminAuthenticated, isUserValid } = require('./middlewares.js/auth')

const responseHandler1 = (req, res, next)=>{
    console.log('Response from handler 1');
    res.send('Response 1')
    // next()
}

server.get(
    '/admin', 
    isAdminAuthenticated,
)

server.get(
    '/admin', 
    responseHandler1, 
)

server.use(
    '/user', 
    isUserValid,
)

server.get('/user', (req,res)=>{
     console.log("user sent");
     res.send({"firstName":"Mayuri", "lastName": "Ladhane"})
})

server.post('/user', (req,res)=>{
     console.log("user added");
     res.send("user added successfully")
})

server.patch('/user', (req,res)=>{
     console.log("user updated");
     res.send("user updated successfully")
})

server.delete('/user', (req,res)=>{
     console.log("user deleted");
     res.send("user deleted successfully")
})

server.listen(3000,()=>{
    console.log('Server running successfully on port 3000')
})