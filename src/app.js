const express = require ('express');
const connectDB = require('./config/database');
const User = require('./models/user')
const server = express();

server.post('/signup', async(req,res)=>{
    const user = new User({
        firstName: 'Mayuri',
        lastName: 'Ladhane',
        email: 'mayuriladhane3@gmail.com',
        password: 'Mayuri123'
    })

    try {
        await user.save();
        res.send('Data saved successfully');
    }catch (err){
        res.status(400).send('Something went wrong')
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