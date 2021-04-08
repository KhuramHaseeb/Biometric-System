const auth = require("./auth");
const constant = require("./constant");
const employee = require("./employee");
const designation = require("./designation");
const department = require("./department");
const employeeRoute=require('./employee1')
// const user = require('./user');

const authenticate = require("../middlewares/authenticate");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res
      .status(200)
      .send({
        message:
          "Welcome to the AUTHENTICATION API. Register or Login to test Authentication.",
      });
  });

  app.use("/auth", auth);
  // app.use('/user', authenticate, user);
//   app.use("/constant", authenticate,  constant);
//   app.use("/employee", authenticate, employee);
//   app.use("/department", authenticate, department);
//   app.use("/designation", authenticate, designation);
app.use("/employee", employee);
  app.use("/constant", constant);
 // app.use("/employee", employee2);
  app.use("/", employeeRoute);
  app.use("/department", department);
  app.use("/designation", designation);
};
