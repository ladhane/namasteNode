const express = require('express');
const { userAuth } = require('../middlewares/auth')
const connectionRouter = express.Router();

connectionRouter.post('/sendConnectionRequest', userAuth, async(req,res,next)=>{
    try{
        const user = req.user;
        res.send(user.firstName + ' sent a connection request');
    }catch(err){
        res.status(400).send('ERROR: ' + err.message)
    }
})

module.exports = connectionRouter;