const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({    
    job_name : String,
    post : String,
    offered_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "manager"
    },
    applied_by : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }],
    status : String,
    salary : Number,
    date : {
        type : Date,
        default : Date.now(),
    }
})

module.exports = mongoose.model("job" , jobSchema);