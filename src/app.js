const express = require ('express');
const server = express();

// this will handle /abc, /ac
// server.get(/a(b)?c/, (req,res) => {
//   res.send('Matches succesfully');
// });

//this will handle /abc, /abbc, /abbbbc (basicall a followed by n no. of b's followed by c)
// server.get(/a(b)+c$/, (req,res) => {
//   res.send('Matches succesfully');
// });

server.get(/(ab)*(cd)/, (req,res) => {
  res.send('Matches succesfully');
});

server.get('/test/:userId/:firstname',(req,res)=>{
    console.log(req.params);
    res.send(req.params);
})

server.get('/test',(req,res)=>{
    console.log(req.query);
    res.send(req.query);
})

//this will handle only GET http reguest for /user
server.get('/user',(req,res)=>{
    res.send({firstname: 'Mayuri', lastname: 'Ladhane'})
})

//this will handle only POST https request for /user
server.post('/user',(req,res)=>{
    //logic to save data to DB
    res.send('user added to DB successfully')
})

//this will handle only PATCH http request for /user
server.patch('/user',(req,res)=>{
    //logic to update data in DB
    res.send('user updated in DB successfully')
})

//this will handle only DELETE http request for /user
server.delete('/user',(req,res)=>{
    //logic to delete data from DB
    res.send('user deleted from DB successfully')
})

server.listen(3000,()=>{
    console.log('Server running successfully on port 3000')
})