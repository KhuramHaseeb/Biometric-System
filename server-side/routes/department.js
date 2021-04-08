const express = require("express");
const router = express.Router();
const department = require("../controller/department");

router.post("/addDepartment", department.addDepartment);
router.get("/getDepartment", department.getDepartment);
router.get("/delDepartment", department.delDepartment);
router.post("/updateDepartment", department.updateDepartment);

module.exports = router;
