var express = require("express");
var router = express.Router();
const productCtrl = require("../controllers/products");
const { ensureAuthenticated } = require("../config/auth");

router.get("/", ensureAuthenticated, productCtrl.allProduct);
router.get("/add", ensureAuthenticated, productCtrl.addProduct);

module.exports = router;
