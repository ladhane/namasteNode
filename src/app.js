const express = require ('express');
const connectDB = require('./config/database');
const User = require('./models/user')
const server = express();

server.use(express.json());
//APT to signup
server.post('/signup', async(req,res)=>{
    const user = new User(req.body);
    try {
        await user.save();
        res.send('Data saved successfully');
    }catch (err){
        res.status(400).send('Error Message:' + err.message)
    }
})

//API to GET a user
server.get('/user',async(req,res)=>{
    try{
        const emailId = req.body.email;
        const user = await User.findOne({email:emailId});
        if(!user){
             res.send('User not found');
        }else{
             res.send(user);
        }
    }catch(err){
        res.status(400).send('Something went wrong!')
    }
})

//API to GET all the users
server.get('/feed',async(req,res)=>{
    try{
        const users = await User.find({});
        console.log(users);
        console.log("length",users.length);
        if(users.length === 0){
             res.send('User not found');
        }else{
             res.send(users);
        }
    }catch(err){
        res.status(400).send('Something went wrong!')
    }
})

//API to DELETE a user 
server.delete('/user',async(req,res)=>{
    try{
        const userId = req.body.userId
        // const user = await User.findOneAndDelete({_id:userId})
        //Other way of doing it
        const user = await User.findByIdAndDelete(userId)
        res.send(user)
    } catch(err){
        res.status(400).send('Something went wrong')
    }
})

//API to UPDATE a user
server.patch('/user',async(req,res)=>{
    try{
        // const userId = req.body.userId;
        // 3rd param here is options where we can pass multiple things like new with value as
        //'false' -> to return data before update
        //'true' -> to return data after update
        // false is default value
        // We have other options like sort,etc. refer documentation to know about them
        const user = await User.findByIdAndUpdate(userId, req.body);

        //with findOneAndUpdate we can use any parameter to find the document instead of ID
        // const user = await User.findOneAndUpdate({email:req.body.emailId},req.body,{ returnDocument: 'after', runValidators: true});
        res.send(user);
    }catch(err){
        res.status(400).send('Update Error Message : ' + err.message)
    }
})

connectDB().then(()=>{
    console.log('Database connection established successfully')
    server.listen(3000,()=>{
    console.log('Server running successfully on port 3000')
    })
}).catch((err)=>{
    console.log('Issue connecting to DB',err)
})