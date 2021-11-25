const Product = require("../models/product");
const { param } = require("../routes");

// All products
function allProduct(req, res, next) {
  res.render("users/products/index", {
    title: "All Products",
    message: req.flash("message"),
  });
}
// Add product page
function addProduct(req, res, next) {
  res.render("users/products/add", {
    title: "Add Products",
    message: req.flash("message"),
  });
}
// Create new product
function create(req, res, next) {
  console.log(req.body);
  const product = new Product(req.body);
  product.save(function (err) {
    if (err) {
      req.flash("message", "Please try again!");
      return res.redirect("/users/products/add");
    }

    req.flash("message", "Your product has been added");
    res.redirect("/users/products/");
    console.log("added");
  });
}
// View product
function show(req, res, next) {
  Product.findById(req.params.id, function (err, product) {
    console.log(product.reviews);
    res.render("users/products/show", { product, title: "View Product" });
  });
  //   res.send(req.params.id);
}
module.exports = {
  allProduct,
  addProduct,
  create,
  show,
};
