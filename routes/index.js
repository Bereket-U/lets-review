var express = require("express");
var router = express.Router();
const Product = require("../models/product");

/* GET home page. */
router.get("/", function (req, res, next) {
  Product.find({}, function (err, products) {
    // console.log(products);
    // console.log(req.user.id);
    res.render("index", {
      products,
      title: "Home",
    });
  });
});

module.exports = router;
