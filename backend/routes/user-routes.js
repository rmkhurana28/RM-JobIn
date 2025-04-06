const express = require('express');
const { userSignup, userLogin , sendAvailableJobs , sendAppliedJobs , applyForJob , unApplyForJob, userLogout} = require('../controllers/userController');
const router = express.Router()

// logged in middleware
const isUserLoggedIn = require('../middlewares/isUserLoggedIn');
const isRecLoggedIn = require('../middlewares/isRecLoggedIn');

router.post('/login' , userLogin)

router.post('/signup' , userSignup)

router.get('/dashboard' , isUserLoggedIn , (req,res) => {
    res.send(req.user);
})
router.get('/jobs/available' , isUserLoggedIn , sendAvailableJobs);
router.get('/jobs/applied' , isUserLoggedIn , sendAppliedJobs);

router.post('/jobs/apply/:job_id' , isUserLoggedIn , applyForJob);
router.post('/jobs/unApply/:job_id' , isUserLoggedIn , unApplyForJob);

router.post('/logout' , isUserLoggedIn , userLogout)

module.exports = router