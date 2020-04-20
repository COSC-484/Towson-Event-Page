const express = require('express');
const router = express.Router();

//User Model
const User  = require('../../models/User.model');

// @route GET api/Users
// @desc Get All Users
// @access Public

router.get('/', (req, res) => {
    User.find()
        .sort({date: -1 })
        .then(Users => res.json(Users))
});

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, Users) {
        res.json(Users);
    });
});

// @route POST api/Users
// @desc Create A User
// @access Public

router.post('/', (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password

    });

    newUser.save().then(User => res.json(User));
});


// @route DELETE api/Users
// @desc Delete a User
// @access Public

router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(User => User.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
});

module.exports = router;

