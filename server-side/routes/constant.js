const express = require("express");
const router = express.Router();
const constant = require("../controller/constant");

router.post("/addConstant", constant.addConstant);
router.get("/delConstant_typeId", constant.delConstant_typeId);
router.get("/getConstant_typeId", constant.getConstant_typeId);
router.post("/updateConstant_typeId", constant.updateConstant_typeId);

module.exports = router;
