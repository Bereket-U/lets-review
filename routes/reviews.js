var express = require("express");
var router = express.Router();
const reviewCtrl = require("../controllers/reviews");
const { ensureAuthenticated } = require("../config/auth");

router.post("/:id/:userId", ensureAuthenticated, reviewCtrl.create);

module.exports = router;
