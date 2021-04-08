const DesignationSchema = require("../model/Designation");
const { getNextSequence } = require("./getNextSequence");

exports.addDesignation = async (req, res) => {
  // console.log(req.body);

  const addDesignation = new DesignationSchema({
    id: await getNextSequence("counters", "designation"),
    code: req.body.code,
    name: req.body.Name.toLowerCase().replace(/\b(\w)/g, (s) =>
      s.toUpperCase()
    ),
  });

  addDesignation
    .save()
    .then((data) => {
      // console.log("Saved Designation", data);
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
  // res.send(req.body)
};

exports.delDesignation = async (req, res) => {
  // console.log(req.query);
  DesignationSchema.findOneAndDelete(req.query)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};

exports.getDesignation = async (req, res) => {
  // console.log(req.query);
  DesignationSchema.find(req.query)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};

exports.updateDesignation = async (req, res) => {
  // console.log(req.query);
  // console.log(req.body.params);
  // console.log(req.body.body);
  DesignationSchema.findOneAndUpdate(req.body.params, req.body.body)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};
