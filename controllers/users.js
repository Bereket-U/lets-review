const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

function index(req, res, next) {
  res.render("users/index", { title: "User index" });
}

function login(req, res, next) {
  res.render("users/login", {
    title: "Login",
    message: req.flash("message"),
  });
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
              req.flash(
                "message",
                "Congratulations, your account has been created, Please Login to continue"
              );
              res.redirect("/users/login");
            });
          });
        });
      }
    });
  }
}
function loginPassport(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/users/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
}

function logout(req, res, next) {
  req.logout();
  req.flash("message", "You have successfully logged out ");
  res.redirect("/users/login");
}
module.exports = {
  index,
  login,
  register,
  newUser,
  loginPassport,
  logout,
};
