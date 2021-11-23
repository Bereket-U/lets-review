const User = require("../models/user");

function index(req, res, next) {
  res.render("users/index", { title: "User index" });
}

function login(req, res, next) {
  res.render("users/login", { title: "Login" });
}

function register(req, res, next) {
  res.render("users/register", { title: "register" });
}

module.exports = {
  index,
  login,
  register,
};
