const Product = require("../models/product");

// Create review
function create(req, res, next) {
  Product.findById(req.params.id, function (err, product) {
    console.log(product.reviews);
    product.reviews.push(req.body);
    product.save(function (err) {
      res.render("users/products/show", { product });
    });
  });
}

module.exports = {
  create,
};
