const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function (req,res,next) {
    if(!req.cookies.user){
        console.log('User not logged in');
        return res.status(401).json({'error' : 'Invalid User'});
    }

    try{
        let userDecoded = jwt.verify(req.cookies.user , process.env.JWT_KEY);

        let user = await userModel.findOne({email : userDecoded.email})
                                  .populate('applied')
                                  .select('-password');

        req.user = user
        next();
    } catch(err) {
        console.log(err.message);
    }
}