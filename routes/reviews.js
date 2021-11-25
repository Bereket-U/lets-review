var express = require("express");
var router = express.Router();
const reviewCtrl = require("../controllers/reviews");
const { ensureAuthenticated } = require("../config/auth");

router.post("/:id/:userId", reviewCtrl.create);

module.exports = router;
