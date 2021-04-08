const express = require("express");
const router = express.Router();
const designation = require("../controller/designation");

router.post("/addDesignation", designation.addDesignation);
router.get("/getDesignation", designation.getDesignation);
router.get("/delDesignation", designation.delDesignation);
router.post("/updateDesignation", designation.updateDesignation);

module.exports = router;
