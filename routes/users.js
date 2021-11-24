var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/users");

/* GET users home listing. */
router.get("/", userCtrl.index);

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
