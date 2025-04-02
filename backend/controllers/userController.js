const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');

const {createUserToken} = require('../utils/createUserToken')

const cookieParser = require('cookie-parser')

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
        return res.send('okay');
        
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