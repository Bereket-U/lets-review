const Product = require("../models/product");
const { param } = require("../routes");

// All products
function myProduct(req, res, next) {
  const userId = req.params.id;
  //   console.log(userId);
  Product.find({ userid: userId }, function (err, products) {
    // console.log(products);
    // console.log(req.user.id);
    res.render("users/products/index", {
      title: "My Products",
      message: req.flash("message"),
      products,
      userId,
    });
  });
}

// Add product page
function addProduct(req, res, next) {
  const userId = req.params.id;
  res.render("users/products/add", {
    title: "Add Products",
    message: req.flash("message"),
    userId,
  });
}
// Create new product
function create(req, res, next) {
  console.log(req.params.id);
  console.log(req.body.image);
  const userId = req.params.id;
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    discription: req.body.discription,
    image: req.body.image,
    userid: userId,
  });
  product.save(function (err) {
    if (err) {
      req.flash("message", "Please try again!");
      return res.redirect(`/users/products/add/${userId}`);
    }

    req.flash("message", "Your product has been added");
    res.redirect(`/users/products/my/${userId}`);
  });
}
// View product
function show(req, res, next) {
  const userId = req.params.userId;
  Product.findById(req.params.id, function (err, product) {
    console.log(product.reviews);
    res.render("users/products/show", {
      product,
      title: "View Product",
      userId,
    });
  });
  //   res.send(req.params.id);
}
function deleteProduct(req, res, next) {
  console.log(req.params.id);
  console.log(req.params.userId);
  Product.deleteOne({ _id: req.params.id }, function (err) {
    if (err) return handleError(err);
    req.flash("message", "Your product has been deleted");
    res.redirect(`/users/products/my/${req.params.userId}`);
  });
}
// View product

module.exports = {
  myProduct,
  addProduct,
  create,
  show,
  deleteProduct,
};
