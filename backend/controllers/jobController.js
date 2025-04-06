const jobModel = require('../models/job-model');
const recModel = require('../models/manager-model');
const userModel = require('../models/user-model');

module.exports.jobCreate = async (req,res) => {

    try{
        await jobModel.create({
            job_name : req.body.jobName,
            post : req.body.jobPost,
            salary : req.body.jobSalary,
            status : 'Available',
            offered_by : req.rec._id,
        })
        
        await recModel.findOneAndUpdate(
            {_id : req.rec._id},
            {
                $push : {offered : job._id},
            },
            {new : true}
        );
    
        return res.send('Job Added Succesfully');
    }

    catch(err){
        console.log(err);
    }
    
    
}

module.exports.jobUpdate = async (req,res) => {

    try{
        await jobModel.findOneAndUpdate(
            {
                _id : req.params.job_id 
            },
            {
                job_name : req.body.jobName,
                post : req.body.jobPost,
                salary : req.body.jobSalary,
                status : req.body.jobStatus,
            },
            {
                new : true,
            }
        )
    
        return res.send('Job Updated Succesfully')
    } catch(err) {
        console.log(err);
    }
    
}

module.exports.jobAccept = async (req,res) => {

    try{
        await jobModel.findOneAndUpdate(
            {_id : req.body.job._id},
            {
                $pull : {applied_by : req.params.user_id}
            },
            {
                new : true
            }
        )
    
        await userModel.findOneAndUpdate(
            {_id : req.params.user_id},
            {
                $pull : {applied : req.body.job._id}
            },
            {
                new : true
            }
        )
    
        return res.send('Job Accepted Succesfully');

    } catch(err){
        console.log(err);
    }

    
}