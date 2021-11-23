var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/users");

/* GET users listing. */
router.get("/", userCtrl.index);

/* GET login  page. */
router.get("/login", userCtrl.login);
/* GET register  page. */
router.get("/register", userCtrl.register);

/* GET register  page. */
router.post("/register", userCtrl.newUser);
module.exports = router;
