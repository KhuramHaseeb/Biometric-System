const express = require("express");
const Auth = require("../controller/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message:
      "You are in the Auth Endpoint. Register or Login to test Authentication.",
  });
});

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.post("/recover", Auth.recover);
router.post("/logout", Auth.logout);
router.post("/reset/:token", Auth.resetPassword);

module.exports = router;
