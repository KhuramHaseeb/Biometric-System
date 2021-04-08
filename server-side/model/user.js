const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  id: Number,
  firstName: String,
  lastName: String,
  cell: String,
  role: String,
});

const EmployeeSchema = mongoose.model("", emplopyeeSchema);

module.exports = EmployeeSchema;
