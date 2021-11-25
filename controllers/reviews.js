const Product = require("../models/product");

// Create review
function create(req, res, next) {
  //   res.send("hello" + req.params.userId);

  Product.findById(req.params.id, function (err, product) {
    const userId = req.params.userId;
    // console.log(product.reviews);
    product.reviews.push(req.body);
    product.save(function (err) {
      res.render(`users/products/show`, { product, userId });
    });
  });
}

module.exports = {
  create,
};
