const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport"); //possibly delete

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateAccountInput = require("../../validation/updateAccount");

//User Model
const User = require("../../models/user.model");

// @route POST api/users/register
// @desc Register user
// @access Public

router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((Users) => res.json(Users));
});

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, Users) {
    res.json(Users);
  });
});

router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        bio: req.body.bio,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// @route Update api/Users
// @desc Update users profile
// @access Public

router.route("/update-profile/:id").post(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (!user) {
      res.status(404).send("User is not found");
    } else {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.bio = req.body.bio;

      user
        .save()
        .then((user) => {
          res.json("User updated!");
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

router.route("/update-account/:id").post(function (req, res) {
  const { errors, isValid } = validateAccountInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findById(req.params.id, function (err, user) {
    if (!user) {
      res.status(404).send("User is not found");
    } else {

      // Check password
      bcrypt.compare(req.body.currentPassword, user.password).then((isMatch) => {
        if (isMatch) {
          user.email = req.body.email;

          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;

              user.password = hash;

              user
                .save()
                .then((user) => {
                  res.json("User updated with new password!");
                })
                .catch((err) => {
                  res.status(400).send("Update not possible");
                });
            });
          });
        } 
        else {
          return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
        }
      });
    }
  });
});

// @route DELETE api/Users
// @desc Delete a User
// @access Public

router.route("/delete/:id").post(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (!user) {
      res.status(404).send("User is not found");
    } else {
      user
        .remove()
        .then((user) => {
          res.json("User deleted!");
        })
        .catch((err) => {
          res.status(400).send("Delete not possible");
        });
    }
  });
});

module.exports = router;
