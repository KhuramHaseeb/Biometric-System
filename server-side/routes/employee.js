const express = require("express");
const router = express.Router();
const employee = require("../controller/employee");

router.post("/addEmployee", employee.addEmployee);
router.get("/getEmployee", employee.getEmployee);
router.get("/delEmployee", employee.delEmployee);
router.post("/updateEmployee", employee.updateEmployee);

module.exports = router;
