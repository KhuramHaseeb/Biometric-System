const mongoose = require("mongoose");
var db = mongoose.connection;

exports.getNextSequence = async (clName, name) => {
  var doc = await db
    .collection(clName)
    .findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, { new: true });
  return doc.value.seq;
};
