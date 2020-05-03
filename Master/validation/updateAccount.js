const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAccountInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.currentPassword = !isEmpty(data.currentPassword) ? data.currentPassword : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.currentPassword)) {
    errors.currentPassword = "Current Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "New Password must be at least 6 characters";
  }

  if (!Validator.isLength(data.password2, { min: 6, max: 30 })) {
    errors.password2 = "New Password must be at least 6 characters";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "New Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Passwords must match";
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
