const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user')
const { validateSignUpData } = require('../utils/validate')
const authRouter = express.Router();

//APT to signup
authRouter.post('/signup', async(req,res)=>{
    try {
        //validate our data
        validateSignUpData(req)
        //encryt our data
        const encryptedPassword = await bcrypt.hash(req.body.password,10);
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
authRouter.post('/login',async(req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error('Invalid Credentials');
        }else{
            const isValidPassword = await user.verifyPassword(password);
            if(isValidPassword){
                //Send a jwt token
                const token = await user.getJWT();
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


module.exports = authRouter;