const jwt = require('jsonwebtoken')

const createUserToken = (user) => {
    return jwt.sign({email : user.email} , process.env.JWT_KEY);
}

module.exports.createUserToken = createUserToken