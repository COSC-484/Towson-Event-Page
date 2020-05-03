const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require("passport");
const cors = require('cors');
const mongoose = require('mongoose');
const events = require('./routes/api/events');
const users = require('./routes/api/users');
const path = require('path');


// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());


// cors Middleware
app.use(cors());
app.use(express.json());

//Db Config
const db = require ('./config/keys').mongoURI;

//connect to Mongo
mongoose
    .connect(db, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);


// Use Routes
app.use('/api/users', users);
app.use('/api/events', events);

// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set Static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));

