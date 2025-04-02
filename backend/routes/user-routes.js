const express = require('express');
const { userSignup, userLogin } = require('../controllers/userController');
const router = express.Router()

// logged in middleware
const isUserLoggedIn = require('../middlewares/isUserLoggedIn');

router.post('/login' , userLogin)

router.post('/signup' , userSignup)

router.get('/dashboard' , isUserLoggedIn , (req,res) => {
    res.send(req.user);
})

router.get('/tester' , isUserLoggedIn , (req,res) => {
    console.log(req.user);
    res.send(req.user);
})

module.exports = router