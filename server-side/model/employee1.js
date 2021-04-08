const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const UserSchema = new Schema({
  id: Number,
  firstName: String,
  lastname: String,
  fatherName: String,
  cell: String,
  department: String,
  designation: String,
  isActive: Boolean,
  createdDate: Date,
  adminId: String,
  checkin:String,
  checkout:String,
 
  
});

const EmployeeEntry = mongoose.model("EmployeeEntry", UserSchema);

module.exports = EmployeeEntry;
