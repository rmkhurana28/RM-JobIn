const recModel = require('../models/manager-model')

const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');

const {createRecToken} = require('../utils/createRecToken');
const jobModel = require('../models/job-model');
const userModel = require('../models/user-model');

module.exports.recSignup = async (req,res) => {
    try {
        console.log("Signup req recieved : " , req.body);

        let {name , email , password} = req.body;

        let rec = await recModel.findOne({email});
        if(rec) return res.status(401).json({"error" : "Rec already exists"});

        bcrypt.genSalt(12, async function(err, salt) {
            if(err) return res.status(400).json({'error' : 'Invalid Request'});
            await bcrypt.hash(password, salt, async function(err, hash) {
                if(err) return res.status(400).json({'error' : 'Invalid Request'});
                rec = await recModel.create({
                    name,
                    email,
                    password : hash,
                })
                
                let recToken = createRecToken(rec);
                res.cookie('rec' , recToken);
                res.status(200).json({'success' : 'Account Created Succesfully'});
                console.log("Signup succesfull");
                return;

            });
        });

        

        console.log("Rec created !!");
        return;
        
    } catch(err) {
        console.log(err);
        res.send(err)
    }
}

module.exports.recLogin = async function (req,res){
    try {        
        let {email , password} = req.body;

        let rec = await recModel.findOne({email});
        if(!rec) return res.status(401).json({"error" : "Rec does NOT exists"});        

        bcrypt.compare(password, rec.password , function(err, result) {
            if(err) return res.status(400).json({'error' : 'Invalid Request'});
            
            if(!result) return res.status(401).json({'error' : 'Incorrect Password'})
            else {

                let recToken = createRecToken(rec);
                res.cookie('rec' , recToken);

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

module.exports.recGetAllOffered = async function (req,res){
    try{
        let offeredJobs = await jobModel.find({offered_by : req.rec._id});
        console.log('offered jobs : ' , offeredJobs);
        return res.send(offeredJobs);
    } catch(err){
        console.log(err);
        res.send(err);
    }
}

module.exports.recWithdrawJob = async function(req,res){
    let {job_id} = req.params;

    let job = await jobModel.findOne({_id : job_id});

    let offeredBy = await recModel.findOneAndUpdate(
        {_id : req.rec._id},
        {
            $pull : {offered : job_id},
        },
        {new : true},
    );

    // let allUsers = await userModel.find();
    
    // allUsers.map((user) => {
    //     user.applied.some()
    // })

    await userModel.updateMany(
        {applied : job_id},
        {
            $pull : {applied : job_id},
        }
    )

    await jobModel.deleteOne({_id : job_id});

    return res.send('updated');

    
}