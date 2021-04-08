const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  id: Number,
  code: String,
  name: String,
});

const DepartmentSchema = mongoose.model("department", departmentSchema);

module.exports = DepartmentSchema;
