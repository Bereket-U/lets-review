const Product = require("../models/product");

// All products
function allProduct(req, res, next) {
  res.render("users/products/index", {
    title: "Add Products",
    message: req.flash("message"),
  });
}
// Add product
function addProduct(req, res, next) {
  res.render("users/products/add", {
    title: "Add Products",
    message: req.flash("message"),
  });
}

function create(req, res, next) {
  console.log(req.body);
  const product = new Product(req.body);
  product.save(function (err) {
    if (err) {
      req.flash("message", "Please try again!");
      return res.redirect("/users/products/add");
    }

    req.flash("message", "Congratulations, your product has been added");
    res.redirect("/users/products/");
    console.log("added");
  });
}

module.exports = {
  allProduct,
  addProduct,
  create,
};
