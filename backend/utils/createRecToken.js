const jwt = require('jsonwebtoken')

const createRecToken = (rec) => {
    return jwt.sign({email : rec.email} , process.env.JWT_KEY);
}

module.exports.createRecToken = createRecToken