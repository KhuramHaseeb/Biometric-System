const mongoose = require("mongoose");

const excelToJson = require("convert-excel-to-json");
const checkInSchema = require("../model/checkInSchema");
const checkOutSchema = require("../model/checkOutSchema");
const moment =require('moment-timezone');
const EmployeeEntry = require("../model/employee");
exports.employee = (req, res) => {
  console.log(req.body);

  const AddEmployee = new EmployeeEntry({
    id: req.body.id,
    firstName: req.body.firstName,
    lastname: req.body.lastname,
    fatherName: req.body.fatherName,
    cell: req.body.cell,
    department: req.body.department,
    designation: req.body.designation,
    isActive: true,
    createdDate: req.body.createdDate, //new Date;
    adminId: req.body.adminId,
    checkin: req.body.checkin,
    checkout: req.body.checkout,
  });

  AddEmployee.save()
    .then((data) => {
      console.log("saved user", data);
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
  // res.send(req.body)
};
exports.employeeList = (req, res) => {
  EmployeeEntry.find()
    .select("id firstName lastName fatherName designation department checkIn")
    .then((employeData) => {
      res.json(employeData);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.checkinUser = (req, res, next) => {
  // console.log(`req`,req);
  filePath = __basedir + "/checkinUser/" + req.file.filename;
  let results = {};
  const excelData = excelToJson({
    sourceFile: filePath,
    sheets: [
      {
        // Excel Sheet Name
        name: "Customers",

        // Header Row -> be skipped and will not be present at our result object.
        header: {
          rows: 1,
        },

        // Mapping columns to keys
        columnToKey: {
          A: "checkinId",
          B: "checkinTime",
          C: "date",
        },
      },
    ],
  });
  // console.log(`checkinUser`, excelData);
  excelData.Customers.map((checkin, i) => {
    const checkUser = new checkInSchema({
      // _id:new mongoose.Types.ObjectId(),

      checkIn: checkin.checkinId,
      checkinTime: checkin.checkinTime,
      checkinDate: moment.tz(checkin.date,"Asia/Islamabad").format('MM-DD-YYYY'),
    });
    console.log("ll",checkUser)
    checkUser.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        // console.log(`result`, i);
        results[i] = result;
      }
      if (i === excelData.Customers.length - 1) {
        res.send(results);
      }
    });
  });
};

exports.checkoutUser = (req, res, next) => {
  //  console.log(`req`,req);
  filePath = __basedir + "/checkoutUser/" + req.file.filename;
  let results = {};
  const excelData = excelToJson({
    sourceFile: filePath,
    sheets: [
      {
        // Excel Sheet Name
        name: "Customers",

        // Header Row -> be skipped and will not be present at our result object.
        header: {
          rows: 1,
        },

        // Mapping columns to keys
        columnToKey: {
          A: "CheckoutID",
          B: "CheckoutTime",
          C: "Date",
        },
      },
    ],
  });
  // console.log(`checkoutUser`, excelData);
  excelData.Customers.map((checkout, i) => {
    const checkUser = new checkOutSchema({
      // _id:new mongoose.Types.ObjectId(),

      checkOut: checkout.CheckoutID,
      checkoutTime: checkout.CheckoutTime,
      checkoutDate: moment.tz(checkout.date,"Asia/Islamabad").format('MM-DD-YYYY')
    });
    checkUser.save((err, result) => {
      // console.log(`kk`, result);
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        //  console.log(`result`, i);
        results[i] = result;
      }
      if (i === excelData.Customers.length - 1) {
        res.send(results);
      }
    });
  });
};

exports.employByid = (req, res,id) =>  {

  EmployeeEntry.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    {
      $lookup: {
        from: "clcheckins",
        localField: "checkIn",
        foreignField: "checkIn",
        as: "checkinlist",
      },
    },
    // {
    //   $unwind: "$checkinlist",
    // },

    {
      $lookup: {
        from: "clcheckouts",
        localField: "checkOut",
        foreignField: "checkOut",
        as: "checkoutlist",
      },
    },
    // {
    //   $unwind: "$checkoutlist",
    // },
    { $project: { union: { $concatArrays: ["$checkinlist", "$checkoutlist"] } ,firstName:1,lastName:1,fatherName:1,department:1,designation:1} },
    { $unwind: '$union' },
    {
      $project: {
        checkIn_id: "$union.checkIn",
        checkinTime: "$union.checkinTime",
        checkinDate: "$union.checkinDate",
        checkout_id: "$union.checkOut",
        checkoutTime: "$union.checkoutTime",
        checkoutDate: "$union.checkoutDate",
        firstName:1, lastName:1,fatherName:1,department:1,designation:1
      },
    },

    // {
    //   $group:{
    //       _id :

    //     {  checkout_id : "$checkout_id",
    //     checkoutTime:"$checkoutTime",
    //     checkoutDate:"$checkoutDate",
    //     checkIn_id : "$checkIn_id",
    //       checkinTime:"$checkinTime",
    //       checkinDate:"$checkinDate",
    //       firstName:"$firstName"
    //   },
      
    //   }
    // }

    //   }
  ])
   .exec(function (err, results) {
     console.log("result",results)
    if (err) 
    throw err;
    res.send(results);
    
   
  });
  
  // .then((employeData) => {
  //   res.json(employeData);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
};

exports.checkin = (req, res) => {
  checkInSchema
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.userById = (req, res, next, id) => {
  EmployeeEntry.findById(id)
    //populate following and followers users array
    .populate("checkout_id,checkoutTime,checkoutDate")
    // .select("checkout_id,checkoutTime")

    .toArray(function (err, result) {
      if (err || !post) {
        return res.status(400).json({
          error: err,
        });
      }
      req.post = result;
      // console.log(`postbyid`, req.post);
      next();
    });
};

exports.getExcelSheet = (req, res) => {
  // EmployeeEntry.find()
  //       .toArray(function (err, result) {
  //         res.json({
  //           result,
  //         });
  //       });

  const emploee = EmployeeEntry.find()
    // console.log(`req khuram`,req.params.id);
    // .populate({
    //   path:"checkcombine",
    //   model: 'CheckoutUser'
    // })
    // .select("address")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.workingHour = (req, res) => {
  // console.log("check",req)
  // console.log(`req.param.id`,req.params.userId);
  const employ = Customers
    // // .select("address")
    //  .populate('checkout_id','checkout_id')
    // .exec((err, result) => {
    //   // console.log(`show data`,result);
    //     if (err) {
    //         return res.status(400).json({
    //             error: err
    //         });
    //     }
    //     else {
    //         res.send(result);
    //     }
    // });
    .aggregate([
      {
        $lookup: {
          from: "CheckoutUser",
          localField: "_id",
          foreignField: "_id",
          as: "checkcombine",
        },
      },
    ])
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getExcelSheet = (req, res) => {
  // let query={ checkinUser:"30"}

  // const hh=
  // // const employ=Customers.find({}, { projection: {query}})
  // // .toArray(function(err, result) {
  // //   if (err) throw err;
  // //   console.log(result);

  // // });

  Customers.find({}).then((posts) => {
    // console.log(`employee`, posts);
    res.json(posts);
  });
  // console.log(`employee`,employ);
  // const emploee= Customers.find()
  // console.log(`req khuram`,req.params.id);
  // .populate({
  //   path:"checkcombine",
  //   model: 'CheckoutUser'
  // })
  // .select("address")
  // .then((posts) => {
  //   res.json(posts);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
};



