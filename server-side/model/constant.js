const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const constantSchema = new Schema({
  id: Number,
  constantId: Number,
  code: String,
  name: String,
  value: Number,
  typeId: Number,
});

const ConstantSchema = mongoose.model("constant", constantSchema);

module.exports = ConstantSchema;
