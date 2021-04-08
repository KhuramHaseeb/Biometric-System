const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const emplopyeeSchema = new Schema(
  {
    id: Number,
    firstName: String,
    lastName: String,
    fatherName: String,
    cell: String,
    checkIn: Number,
    checkOut: Number,
    department: String,
    designation: String,
    isActive: Boolean,
    joiningDate: {
      type: Date,
    },
    roleType: {
      type: Number,
      // required: "Role is required",
      // trim: true,
    },
    // createdDate: Date,
    adminId: String,
    email: {
      type: String,
      unique: true,
      required: "Your email is required",
      trim: true,
    },

    userName: {
      type: String,
      unique: true,
      required: "Your username is required",
    },

    password: {
      type: String,
      required: "Your password is required",
      max: 100,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },

    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

emplopyeeSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

emplopyeeSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

emplopyeeSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    email: this.email,
    userName: this.userName,
    firstName: this.firstName,
    lastName: this.lastName,
    roleType: this.roleType,
  };
  console.log(process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

emplopyeeSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

const EmployeeSchema = mongoose.model("employee", emplopyeeSchema);

module.exports = EmployeeSchema;