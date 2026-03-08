const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    lastName:{
        type: String,
        minLength: 4,
        maxLength:20
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is invaliid '+ value);
            }
        }
        // match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Email id is not valid']
    },
    password:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error ('Strong Password required '+ value);
            }
        }
        // validate(value) {
        //     const regex =
        //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        //     if (!regex.test(value)) {
        //         throw new Error('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.');
        //     }
        // }
    },
    gender:{
        type: String,
        validate(value){
            if(!['M','F','O'].includes(value)){
                throw new Error('Your Gender must be M, F or O');
            }
        }
    },
    photoUrl:{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        validate(value){
            if(!validator.isURL(value)){
                throw new Error ('URL is invaliid '+ value);
            }
        }
    },
    age:{
        type: Number,
        min: 18
    },
    about:{
        type: String,
        maxLength: 250,
        default: 'Hey there! I am on DevSocial.'
    }, 
    skills:{
        type: [String]
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;