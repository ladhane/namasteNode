const validator = require('validator');

const validateSignUpData = (req) => {

    const { firstName, lastName, email, password} = req.body;

        if (!firstName || !lastName){
            throw new Error ('Name field is missing')
        }else if( firstName.length < 4 ||  firstName.length > 20){
            throw new Error ('firstName can contain 4-20 characters only')
        }else if( lastName.length < 4 ||  lastName.length > 20){
            throw new Error ('lastName can contain 4-20 characters only')
        }else if (!email){
            throw new Error ('Email is required')
        }else if (!validator.isEmail(email)){
            throw new Error ('Email is invalid')
        }else if (!password){
            throw new Error ('password is required')
        }else if (!validator.isStrongPassword(password)){
            throw new Error ('Password is not strong enough to save')
        }

}

module.exports = { validateSignUpData };