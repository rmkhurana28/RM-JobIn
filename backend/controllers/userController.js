const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');

const {createUserToken} = require('../utils/createUserToken')

const cookieParser = require('cookie-parser');
const jobModel = require('../models/job-model');

module.exports.userSignup = async function (req,res){
    try {
        console.log("Signup req recieved : " , req.body);

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
                console.log("Signup succesfull");
                return;

            });
        });

        

        console.log("User created !!");
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
                console.log("login success");
                return;
            }
        });        
        
    } catch(err) {
        console.log(err);
        res.send(err)
    }
}

module.exports.sendAvailableJobs = async function(req,res){
    let allJobs = await jobModel.find();
    res.send(allJobs)
}

module.exports.sendAppliedJobs = async function(req,res){
    res.send(req.user.applied);
}

module.exports.applyForJob = async function(req,res){
    console.log("calling");
    let user = req.user;

    let {job_id} = req.params;

    let job = await jobModel.findOne({_id : job_id});

    if(!job) return res.send('job not found');

    let alreadyApplied = user.applied.some(currentJob => currentJob.equals(job_id));
    if (alreadyApplied) return res.status(400).send('Already applied');

    // user.applied.map((currentJob) => {
    //     if(currentJob === job._id) return res.send('already exist');
    // })

    user.applied.push(job_id);
    job.applied_by.push(user._id);
    await user.save();
    await job.save();
    console.log("user and job updated");

    return res.send("updated")
    
}

module.exports.unApplyForJob = async function(req,res){
    let user = await userModel.findOne({_id : req.user._id});

    let {job_id} = req.params;

    let job = await jobModel.findOne({_id : job_id});
    if(!job) return res.send('job not found');

    user.applied = user.applied.filter(jobId => jobId.toString() !== job_id.toString());
    job.applied_by = job.applied_by.filter(userId => userId.toString() !== user._id.toString());

    await user.save();
    await job.save();

    console.log("user and job removed");

    return res.send("removed")
}