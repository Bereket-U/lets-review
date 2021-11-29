const Product = require("../models/product");
const { param } = require("../routes");

// All products
function myProduct(req, res, next) {
  const userId = req.params.id;
  Product.find({ userid: userId }, function (err, products) {
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
  const userId = req.params.id;
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    discription: req.body.discription,
    image: `/images/${req.file.filename}`,
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
    res.render("users/products/show", {
      product,
      title: "View Product",
      userId,
    });
  });
}

// Edit Product
function edit(req, res, next) {
  const userId = req.params.userId;
  Product.findById(req.params.id, function (err, product) {
    res.render("users/products/edit", {
      product,
      title: "Edit Product",
      message: req.flash("message"),
      userId,
    });
  });
}
// Update product
function update(req, res, next) {
  console.log(req.body);
  Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: `/images/${req.file.filename}`,
      discription: req.body.discription,
    },
    function (err) {
      if (err) {
        req.flash("message", "Please try again");
      } else {
        req.flash("message", "Your product has been Updated");
        res.redirect(
          `/users/products/edit/${req.params.id}/${req.params.userId}`
        );
      }
    }
  );
}

// Delete Product
function deleteProduct(req, res, next) {
  Product.deleteOne({ _id: req.params.id }, function (err) {
    if (err) return handleError(err);
    req.flash("message", "Your product has been deleted");
    res.redirect(`/users/products/my/${req.params.userId}`);
  });
}
// product search
function search(req, res, next) {
  const userId = req.params.userId;
  Product.find({ name: req.body.search }, function (err, products) {
    req.flash("message", "Search result . . . ");
    res.render(`users/products/search`, {
      title: "search",
      message: req.flash("message"),
      products,
      userId,
    });
  });
}

module.exports = {
  myProduct,
  addProduct,
  create,
  show,
  edit,
  update,
  deleteProduct,
  search,
};
