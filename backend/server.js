const express = require('express')
const app = express()

// dotenv
require('dotenv').config();

// database
const db = require('./config/mongoose-connection');

// connection with frontend
const cors = require('cors');

// cookies parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Serve static files from frontend
app.use(express.static(path.join(__dirname, 'dist')));



const userRoutes = require('./routes/user-routes');
const recRoutes = require('./routes/rec-routes')
const jobRoutes = require('./routes/job-routes')

app.use(cors({
    origin: "http://localhost:5173",
    credentials : true,
}))
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.send('working')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
<<<<<<< HEAD
  });
=======
});
>>>>>>> 21a0d3e (new commit)

app.use('/U' , userRoutes)
app.use('/R' , recRoutes)
app.use('/J' , jobRoutes)


// app.post('/Ulogin' , (req,res) => {
//     console.log("login req recieved : " , req.body);
//     res.send('okay');
// })
// app.post('/Usignup' , (req,res) => {
//     console.log("signup req recieved : " , req.body);
//     res.send('okay');
// })

const jobModel = require('./models/job-model')



app.listen(process.env.PORT)

