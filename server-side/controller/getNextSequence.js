// const CounterSchema = require("../model/counter");
const mongoose = require("mongoose");
var db = mongoose.connection;

exports.getNextSequence = async (clName, name) => {
  // db.collection("counters").findAndModify(
  //   { query: { _id: name } },
  //   null,
  //   { update: { $inc: { seq: 1 } } },
  //   { new: true },
  //   (err, data) => {
  //     console.log("Result", data);
  //     console.log("Error", err);
  //     // return ret.seq;
  //   }
  // );

  var doc = await db
    .collection(clName)
    .findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, { new: true });
  return doc.value.seq;

  // db.collection("counters").findAndModify({
  //   query: { _id: "constants" },
  //   update: { $inc: { seq: 1 } },
  //   new: true,
  // }).then((data) => {
  //   console.log("saved user", data);
  //   // res.send(data);
  // })
  // .catch((err) => {
  //   console.log("Err ", err);
  //   // res.send(err);
  // });
};
