const ConstantSchema = require("../model/constant");
const { getNextSequence } = require("./getNextSequence");
const mongoose = require("mongoose");
var db = mongoose.connection;

exports.addConstant = async (req, res) => {
  // console.log(req.body);
  

  const AddConstant = new ConstantSchema({
    id: req.body.id,
    code: req.body.code,
    name: req.body.Name.toLowerCase().replace(/\b(\w)/g, (s) =>
      s.toUpperCase()
    ),
    value: req.body.value,
    constantId: await getNextSequence("counters", "constants"),
    typeId: req.body.typeId ? req.body.typeId : 0,
  });

  AddConstant.save()
    .then((data) => {
      // console.log("Saved Constant", data);
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
  // res.send(req.body)
};

exports.delConstant_typeId = async (req, res) => {
  // console.log(req.params);
  ConstantSchema.findOneAndDelete(req.query)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};

exports.getConstant_typeId = async (req, res) => {
  console.log(req);
  // console.log(req.params);
  ConstantSchema.find(req.query)
    .then(async (data) => {
      let nextId = [];
      // console.log("all data", [
      //   { data: { ...data } },
      //   { nextId: nextId[0].id ? nextId[0].id : 0 },
      // ]);
      // console.log(data.length());
      data.length !== 0
        ? (nextId = await ConstantSchema.find({}, { id: 1, _id: 0 })
            .sort({ id: -1 })
            .limit(1))
        : null;

      res.send({
        data: data,
        nextId:
          // nextId[0]
          //   ? nextId[0].id
          //   :
          await db
            .collection("counters")
            .findOne({ _id: "constants" }, { seq: 1 })
            .then((data) => {
              // console.log(data.seq);
              return data.seq;
            }),
      });
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};

exports.updateConstant_typeId = async (req, res) => {
  // console.log(req.query);
  // console.log(req.body.params);
  // console.log(req.body.body);
  ConstantSchema.findOneAndUpdate(req.body.params, req.body.body)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};
