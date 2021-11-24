var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/users");
const { ensureAuthenticated } = require("../config/auth");

/* GET users home listing. */
router.get("/", ensureAuthenticated, userCtrl.index);

/* GET login  page. */
router.get("/login", userCtrl.login);
/* GET register  page. */
router.get("/register", userCtrl.register);

/* POST register  page. */
router.post("/register", userCtrl.newUser);

/* POST login  page. */
router.post("/login", userCtrl.loginPassport);
router.get("/logout", userCtrl.logout);

module.exports = router;
