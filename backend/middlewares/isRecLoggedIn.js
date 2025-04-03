const jwt = require('jsonwebtoken');
const recModel = require('../models/manager-model');

module.exports = async function (req,res,next) {
    if(!req.cookies.rec){
        console.log('Rec not logged in');
        return res.status(401).json({'error' : 'Invalid Rec'});
    }

    try{
        let recDecoded = jwt.verify(req.cookies.rec , process.env.JWT_KEY);

        let rec = await recModel.findOne({email : recDecoded.email})
                                  .populate('offered')  
                                  .select('-password');

        req.rec = rec
        console.log("rec is logged in ");
        next();
    } catch(err) {
        console.log(err.message);
    }
}