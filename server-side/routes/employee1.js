const express = require('express');
const router = express.Router();

const {employee,checkinUser,checkoutUser,employeeList,employByid,checkin} = require("../controller/employee1");

const{ saveFileCheckIn,saveFileCheckout}=require("../multerStorage");

router.post('/addEmployee', employee);
router.post('/Checkinlist', saveFileCheckIn,checkinUser);
router.post('/Checkoutlist', saveFileCheckout,checkoutUser);
router.get('/employelist', employeeList);
router.get('/checkin', checkin);
router.get("/byid/:id",employByid);
// router.get("/:id", getExcelSheet);
// router.get("/api/getdata", getExcelSheet);
// router.get("/api/workinghour/:userId", workingHour);
// router.get("/api/getExcel", updateExcelSheet);

module.exports = router;
