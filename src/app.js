const express = require ('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/database');
const { userAuth } = require('./middlewares/auth')
const User = require('./models/user')
const { validateSignUpData } = require('./utils/validate')
const server = express();

server.use(express.json());
server.use(cookieParser());
//APT to signup
server.post('/signup', async(req,res)=>{
    try {
        //validate our data
        validateSignUpData(req)
        //encryt our data
        const encryptedPassword = await bcrypt.hash(req.body.password,10);
        console.log(encryptedPassword);
        //save the data
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: encryptedPassword,
            age: req.body.age,
            gender: req.body.gender,
            photoUrl: req.body.photoUrl,
            skills: req.body.skills,
            about: req.body.about
        });
        await user.save();
        res.send('Data saved successfully');
    }catch (err){
        res.status(400).send('Error Message:' + err.message)
    }
})

//API to login
server.post('/login',async(req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error('Invalid Credentials');
        }else{
            const isValidPassword = await bcrypt.compare(password,user.password);
            if(isValidPassword){
                //Send a jwt token
                const token = await jwt.sign({_id : user.id},"Dev@Social#123",{expiresIn : '1h'});
                res.cookie("token",token,{expires : new Date(Date.now() + 24*60*60*1000)});
                res.send('User logged in successfully') 
            }else{
                throw new Error('Invalid Credentials')
            }
        }
    }catch(err){
        res.status(400).send('ERROR : '+ err.message)
    }
});

//API to GET profile
server.get('/profile',userAuth,async(req,res)=>{
    try{
            const user = req.user;
            res.send(user)
    }catch(err){
        res.status(400).send('ERROR:'+ err.message);
    }
})

server.post('/sendConnectionRequest', userAuth, async(req,res,next)=>{
    try{
        const user = req.user;
        res.send(user.firstName + ' sent a connection request');
    }catch(err){
        res.status(400).send('ERROR: ' + err.message)
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