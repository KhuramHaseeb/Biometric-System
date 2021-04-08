const DepartmentSchema = require("../model/department");
const { getNextSequence } = require("./getNextSequence");

exports.addDepartment = async (req, res) => {
  console.log(req.body);

  const addDepartment = new DepartmentSchema({
    id: await getNextSequence("counters", "department"),
    code: req.body.code,
    name: req.body.Name.toLowerCase().replace(/\b(\w)/g, (s) =>
      s.toUpperCase()
    ),
  });

  addDepartment
    .save()
    .then((data) => {
      console.log("Saved Department", data);
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};

exports.delDepartment = async (req, res) => {
  console.log(req.params);
  DepartmentSchema.findOneAndDelete(req.query)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};

exports.getDepartment = async (req, res) => {
  console.log(req.query);
  DepartmentSchema.find(req.query)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};

exports.updateDepartment = async (req, res) => {
  DepartmentSchema.findOneAndUpdate(req.body.params, req.body.body)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Err ", err);
      res.send(err);
    });
};
