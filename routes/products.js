var express = require("express");
var router = express.Router();
const productCtrl = require("../controllers/products");
const { ensureAuthenticated } = require("../config/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

/* GET Product Index  page. */
router.get("/my/:id", ensureAuthenticated, productCtrl.myProduct);

/* GET Add Product  page. */
router.get("/add/:id", ensureAuthenticated, productCtrl.addProduct);

/* POST create product  page. */
router.post(
  "/create/:id",
  upload.single("image"),
  ensureAuthenticated,
  productCtrl.create
);

/* POST create product  page. */
router.get(
  "/delete/:id/:userId",
  ensureAuthenticated,
  productCtrl.deleteProduct
);

/* GET view product  page. */

router.get("/:id/:userId", ensureAuthenticated, productCtrl.show);

module.exports = router;
