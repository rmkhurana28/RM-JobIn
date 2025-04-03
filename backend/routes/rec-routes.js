const express = require('express')
const router = express.Router()

const {recSignup, recLogin, recGetAllOffered, recWithdrawJob} = require('../controllers/recController')

const isRecLoggedIn = require('../middlewares/isRecLoggedIn');

router.post('/signup' , recSignup);
router.post('/login' , recLogin);

router.get('/dashboard' , isRecLoggedIn , (req,res) => {
    res.send(req.rec);
})

router.get('/jobs/offered' , isRecLoggedIn , recGetAllOffered);

router.put('/jobs/offered/withdraw/:job_id' , isRecLoggedIn , recWithdrawJob)

router.get('/' , (req,res) => {
    res.send('working');
})


module.exports = router;