var express = require("express");
var router = express.Router();
const productCtrl = require("../controllers/products");
const { ensureAuthenticated } = require("../config/auth");

/* GET Product Index  page. */
router.get("/my/:id", ensureAuthenticated, productCtrl.myProduct);

/* GET Add Product  page. */
router.get("/add/:id", ensureAuthenticated, productCtrl.addProduct);

/* POST create product  page. */
router.post("/create/:id", productCtrl.create);

/* POST create product  page. */
router.get("/delete/:id/:userId", productCtrl.deleteProduct);

/* GET view product  page. */

router.get("/:id/:userId", productCtrl.show);

module.exports = router;
