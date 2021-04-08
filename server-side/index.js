const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan = require('morgan');
require("dotenv").config();
let env = process.env;

const app = express();
//all route define
global.__basedir = __dirname;
app.use("/public", express.static(__dirname + "/public"));
// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
// app.use("/public", express.static("public"));

app.set("port", process.env.PORT || 3001);

mongoose.connect(env.Mongoose_URL_2, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => {
    console.log("Yahooo! Connection is Established.");
  })
  .on("error", (err) => {
    console.log("Err: ", err);
  });

//=== INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./middlewares/jwt")(passport);


//Configure Route
require("./routes/index")(app);

app.listen(app.get("port"), function () {
  console.log(`Server Started on: http://localhost:${app.get("port")}`);
});
