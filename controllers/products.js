const Product = require("../models/product");

function allProduct(req, res, next) {
  res.render("users/products/index");
}

function addProduct(req, res, next) {
  res.render("users/products/add");
}

module.exports = {
  allProduct,
  addProduct,
};
