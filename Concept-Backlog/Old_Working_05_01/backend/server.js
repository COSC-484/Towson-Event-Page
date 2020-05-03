const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const events = require('./routes/api/events');
const users = require('./routes/api/users');

// Bodyparser Middleware
app.use(cors());
app.use(express.json());

//Db Config
const db = require ('./config/keys').mongoURI;

//connect to Mongo
mongoose
    .connect(db, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// Use Routes
app.use('/api/users', users);
app.use('/api/events', events);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));

