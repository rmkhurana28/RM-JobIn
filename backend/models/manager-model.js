const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,   
    offered : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "job"
    }],    
    date : {
        type : Date,
        default : Date.now(),
    }
})

module.exports = mongoose.model("user" , userSchema);