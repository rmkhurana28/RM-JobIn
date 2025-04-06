const express = require('express');
const isRecLoggedIn = require('../middlewares/isRecLoggedIn');
const { jobCreate, jobUpdate, jobAccept } = require('../controllers/jobController');
const router = express.Router()

router.post('/create' , isRecLoggedIn , jobCreate);

router.put('/jobs/applications/update/:job_id' , isRecLoggedIn , jobUpdate)

router.put('/jobs/applications/accept/:user_id' , isRecLoggedIn , jobAccept)

module.exports = router;