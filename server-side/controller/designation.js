const DesignationSchema = require("../model/Designation");
const { getNextSequence } = require("./getNextSequence");

exports.addDesignation = async (req, res) => {
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
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};

exports.delDesignation = async (req, res) => {
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
  DesignationSchema.findOneAndUpdate(req.body.params, req.body.body)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};
