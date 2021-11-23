const User = require("../models/user");
const bcrypt = require("bcryptjs");

function index(req, res, next) {
  res.render("users/index", { title: "User index" });
}

function login(req, res, next) {
  res.render("users/login", { title: "Login" });
}

function register(req, res, next) {
  res.render("users/register", { title: "register" });
}

function newUser(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;
  let messages = [];
  //   Check password match
  if (password !== confirmPassword) {
    messages.push({ message: "Passwords do not match" });
  } // check if password is weak
  if (password.length < 5) {
    messages.push({ message: "Weak Password" });
  }
  //   check if no error
  if (messages.length > 0) {
    res.render("users/register", {
      messages,
      name,
      email,
      password,
      confirmPassword,
    });
  } else {
    User.findOne({ email: email }).then(function (user) {
      if (user) {
        //   if user already exist
        messages.push({ message: "This Email already exists" });
        res.render("users/register", {
          messages,
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // To hash a password

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            // save user
            newUser.save().then(function (user) {
              res.render("users/login", {
                message:
                  "Congratulations, your account has been created, Please Login to continue",
              });
            });
          });
        });
      }
    });
  }
}

module.exports = {
  index,
  login,
  register,
  newUser,
};
