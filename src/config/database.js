const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(
        'mongodb+srv://learningnodejs:BfTiEHZlDjSDcKYZ@learnnodejs.vymnzdg.mongodb.net/devSocial',
    );
}

module.exports = connectDB
