<<<<<<< HEAD
const express = require('express');
const app = express();
=======
const express = require('express')
const app = express()
const path = require('path');
>>>>>>> 7bfe0a8 (my commit)

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
const path = require('path');  // <-- Don't forget to require 'path'
app.use(express.static(path.join(__dirname, 'dist')));

const userRoutes = require('./routes/user-routes');
const recRoutes = require('./routes/rec-routes');
const jobRoutes = require('./routes/job-routes');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files again (okay, but technically this can be removed since it's already used above)
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.send('working');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
<<<<<<< HEAD
});

app.use('/U', userRoutes);
app.use('/R', recRoutes);
app.use('/J', jobRoutes);
=======
})

app.use('/api/U' , userRoutes)
app.use('/api/R' , recRoutes)
app.use('/api/J' , jobRoutes)
>>>>>>> 7bfe0a8 (my commit)

// const jobModel = require('./models/job-model');

<<<<<<< HEAD
app.listen(process.env.PORT);
=======

const jobModel = require('./models/job-model')



app.listen(process.env.PORT)

>>>>>>> 7bfe0a8 (my commit)
