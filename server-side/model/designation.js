const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const designationSchema = new Schema({
  id: Number,
  code: String,
  name: String,
});

const DesignationSchema = mongoose.model("designation", designationSchema);

module.exports = DesignationSchema;
