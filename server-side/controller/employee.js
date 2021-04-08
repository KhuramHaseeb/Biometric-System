const EmployeeSchema = require("../model/employee");
const { getNextSequence } = require("./getNextSequence");

exports.addEmployee = async (req, res) => {
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
        joiningDate: req.body.joiningDate,
        adminId: req.body.adminId,
        roleType: req.body.roleType,
      });
      newUser
        .save()
        .then((user) =>
          res.status(200).json({ token: user.generateJWT(), user: user })
        )
        .catch((err) => {
          let message = err.message;
          if (err.code === 11000)
            message = "This email address is linked to another account.";

          res.status(500).json({ message });
        });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
};

exports.delEmployee = async (req, res) => {
  EmployeeSchema.findOneAndDelete(req.query)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getEmployee = async (req, res) => {
  EmployeeSchema.find(req.query)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.updateEmployee = async (req, res) => {
  EmployeeSchema.findOneAndUpdate(req.body.params, req.body.body)
    .then(async (data) => {
      if (req.body.body.password) data.password = req.body.body.password;
      data.save((err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: "Your password has been updated." });
      });
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};
