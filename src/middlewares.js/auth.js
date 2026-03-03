const isAdminAuthenticated = (req,res,next) => {
    console.log("coming here")
    let token = 'adminmnxc';
    const authenticated = token === 'admin'
    console.log('isAdminAuthenticated',authenticated)
    if(!authenticated){
        res.status(403).send('something went wrong')
    } else {
        next()
    }
}

const isUserValid = (req,res,next) => {
    console.log("in middleware")
    let user = "mayuri";
    const isValidUser = user === "mayuri";
    console.log("isValidUser",isValidUser)
    if(!isValidUser){
        res.status(403).send("Not a Valid user")
    } else {
        next()
    }
}

module.exports = {
    isAdminAuthenticated,
    isUserValid
}