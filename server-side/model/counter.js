const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: String,
  seq: Number,
});

const CounterSchema = mongoose.model("counters", counterSchema);

module.exports = CounterSchema;
