const express = require('express')
const router = express.Router()

const {recSignup, recLogin, recGetAllOffered, recWithdrawJob , recGetAllApplications, recLogout} = require('../controllers/recController')

const isRecLoggedIn = require('../middlewares/isRecLoggedIn');

router.post('/signup' , recSignup);
router.post('/login' , recLogin);

router.get('/dashboard' , isRecLoggedIn , (req,res) => {
    res.send(req.rec);
})

router.get('/jobs/offered' , isRecLoggedIn , recGetAllOffered);
router.get('/jobs/applications' , isRecLoggedIn , recGetAllApplications);

router.put('/jobs/offered/withdraw/:job_id' , isRecLoggedIn , recWithdrawJob)

router.post('/logout' , isRecLoggedIn , recLogout)



module.exports = router;