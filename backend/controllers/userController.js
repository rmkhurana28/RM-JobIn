const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');

const {createUserToken} = require('../utils/createUserToken')

const cookieParser = require('cookie-parser');
const jobModel = require('../models/job-model');

module.exports.userSignup = async function (req,res){
    try {        

        let {name , email , password} = req.body;

        let user = await userModel.findOne({email});
        if(user) return res.status(401).json({"error" : "User already exists"});

        bcrypt.genSalt(12, function(err, salt) {
            if(err) return res.status(400).json({'error' : 'Invalid Request'});
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err) return res.status(400).json({'error' : 'Invalid Request'});
                user = await userModel.create({
                    name,
                    email,
                    password : hash,
                })
                
                let userToken = createUserToken(user);
                res.cookie('user' , userToken);
                res.status(200).json({'success' : 'Account Created Succesfully'});
                return;

            });
        });

        return;
        
    } catch(err) {
        console.log(err);
        res.send(err)
    }
}

module.exports.userLogin = async function (req,res){
    try {        
        let {email , password} = req.body;

        let user = await userModel.findOne({email});
        if(!user) return res.status(401).json({"error" : "User does NOT exists"});        

        bcrypt.compare(password, user.password , function(err, result) {
            if(err) return res.status(400).json({'error' : 'Invalid Request'});
            
            if(!result) return res.status(401).json({'error' : 'Incorrect Password'})
            else {

                let userToken = createUserToken(user);
                res.cookie('user' , userToken);

                res.status(200).json({'success' : 'Logged in Succesfully'});
                return;
            }
        });        
        
    } catch(err) {
        console.log(err);
        res.send(err)
    }
}

module.exports.sendAvailableJobs = async function(req,res){
    try{
        let allJobs = await jobModel.find();
        res.send(allJobs)
    } catch(err){
        console.log(err);
    }
    
}

module.exports.sendAppliedJobs = async function(req,res){
    try{
        res.send(req.user.applied);
    } catch(err){
        console.log(err);
    }
    
}

module.exports.applyForJob = async function(req,res){
    try{
        let user = req.user;

        let {job_id} = req.params;

        let job = await jobModel.findOne({_id : job_id});

        if(!job) return res.send('job not found');

        let alreadyApplied = user.applied.some(currentJob => currentJob.equals(job_id));
        if (alreadyApplied) return res.status(400).send('Already applied');        

        user.applied.push(job_id);
        job.applied_by.push(user._id);
        await user.save();
        await job.save();

        return res.send("updated")

    } catch(err){
        console.log(err);
    }
    
}

module.exports.unApplyForJob = async function(req,res){
    try{
        let user = await userModel.findOne({_id : req.user._id});

        let {job_id} = req.params;

        let job = await jobModel.findOne({_id : job_id});
        if(!job) return res.send('job not found');

        user.applied = user.applied.filter(jobId => jobId.toString() !== job_id.toString());
        job.applied_by = job.applied_by.filter(userId => userId.toString() !== user._id.toString());

        await user.save();
        await job.save();


        return res.send("removed")

    } catch(err){
        console.log(err);
    }
    
}

module.exports.userLogout = async (req,res) => {
    try{
        res.clearCookie('user');
        return res.send('Logged out');
    } catch(err){
        console.log(err);
    }
    
}