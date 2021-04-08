  
// const mongoose = require("mongoose");
const EmployeeSchema = require("../model/employee");
const { getNextSequence } = require("./getNextSequence");

exports.addEmployee = async (req, res) => {
  // console.log(req.body);

  // console.log("Register", req.body);
  // Make sure this account doesn't already exist
  EmployeeSchema.findOne({ email: req.body.email })
    .then(async (user) => {
      if (user)
        return res.status(401).json({
          message:
            "The email address you have entered is already associated with another account.",
        });

      // Create and save the user
      const newUser = new EmployeeSchema({
        id: await getNextSequence("counters", "employee"),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        fatherName: req.body.fatherName,
        cell: req.body.cell,
        checkOut: req.body.checkOut,
        checkIn: req.body.checkIn,
        department: req.body.department,
        designation: req.body.designation,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        isActive: true,
        joiningDate: req.body.joiningDate, //new Date;
        adminId: req.body.adminId,
        roleType: req.body.roleType,
      });
      newUser
        .save()
        .then((user) =>
          res.status(200).json({ token: user.generateJWT(), user: user })
        )
        .catch((err) => {
          // console.log("addEmployee", err);
          // console.log("addEmployee", newUser);
          let message = err.message;
          if (err.code === 11000)
            message = "This email address is linked to another account.";

          res.status(500).json({ message });
        });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );

  // const AddEmployee = new EmployeeSchema({
  //   id: await getNextSequence("counters", "employee"),
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   fatherName: req.body.fatherName,
  //   cell: req.body.cell,
  //   checkOut: req.body.checkOut,
  //   checkIn: req.body.checkIn,
  //   department: req.body.department,
  //   designation: req.body.designation,
  //   isActive: true,
  //   createdDate: req.body.createdDate, //new Date;
  //   adminId: req.body.adminId,
  // });

  // AddEmployee.save()
  //   .then((data) => {
  //     console.log("Saved Employee", data);
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     console.log("Err ", err);
  //     res.send(err);
  //   });
  // res.send(req.body)
};

exports.delEmployee = async (req, res) => {
  // console.log(req.query);
  EmployeeSchema.findOneAndDelete(req.query)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      // console.log("Err ", err);
      res.send(err);
    });
};

exports.getEmployee = async (req, res) => {
  // console.log(req.query);
  EmployeeSchema.find(req.query)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      // console.log("Err ", err);
      res.send(err);
    });
};

exports.updateEmployee = async (req, res) => {
  // console.log(req.query);
  // console.log(req.body.params);
  // console.log(req.body.body);
  // EmployeeSchema.findOne(req.body.params).then(user => {
  //   user = req.body.body
  //   user.save().then((data) => {
  //     res.send(data);
  //   })
  // })
  EmployeeSchema.findOneAndUpdate(req.body.params, req.body.body)
    .then(async (data) => {
      if (req.body.body.password) data.password = req.body.body.password;
      data.save((err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: "Your password has been updated." });
      });
      // res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};