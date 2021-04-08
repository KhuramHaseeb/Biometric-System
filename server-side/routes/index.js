const auth = require("./auth");
const constant = require("./constant");
const employee = require("./employee");
const designation = require("./designation");
const department = require("./department");
const employeeRoute = require("./employee1");

const authenticate = require("../middlewares/authenticate");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send({
      message:
        "Welcome to the AUTHENTICATION API. Register or Login to test Authentication.",
    });
  });

  app.use("/auth", auth);
  app.use("/employee", employee);
  app.use("/constant", constant);
  // app.use("/employee", employee2);
  app.use("/", employeeRoute);
  app.use("/department", department);
  app.use("/designation", designation);
};
