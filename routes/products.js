var express = require("express");
var router = express.Router();
const productCtrl = require("../controllers/products");
const { ensureAuthenticated } = require("../config/auth");

/* GET Product Index  page. */
router.get("/", ensureAuthenticated, productCtrl.allProduct);

/* GET Add Product  page. */
router.get("/add", ensureAuthenticated, productCtrl.addProduct);

/* POST create product  page. */
router.post("/create", productCtrl.create);

module.exports = router;
