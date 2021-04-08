const EmployeeSchema = require("../model/employee");
const { sendEmail } = require("../utils/sendmail");
const path = require("path");
require("dotenv").config();
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = (req, res) => {
  // console.log("Register", req.body);
  // Make sure this account doesn't already exist
  EmployeeSchema.findOne({ email: req.body.email })
    .then((user) => {
      if (user)
        return res.status(401).json({
          message:
            "The email address you have entered is already associated with another account.",
        });

      // Create and save the user
      const newUser = new EmployeeSchema(req.body);
      newUser
        .save()
        .then((user) => {
          // res.cookie("token", token, { expire: new Date() + 9999 });
          res.status(200).json({ token: user.generateJWT(), user: user });
        })
        .catch((err) => {
          let message = err.message;
          if (err.code === 11000)
            message = "This email address is linked to another account.";

          res.status(500).json({ message });
        });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = (req, res) => {
  // console.log("Login", req.body);

  EmployeeSchema.findOne({ userName: req.body.userName }, { email: 1 }).then(
    (d) => {
      // console.log(d);
      if (!d)
        return res.status(401).json({
          msg:
            "The username " +
            req.body.userName +
            " is not associated with any account. Double-check your username and try again.",
        });

      EmployeeSchema.findOne({ email: d.email })
        .then((user) => {
            // console.log(user);
          if (!user)
            return res.status(401).json({
              msg:
                "The email address " +
                d.email +
                " is not associated with any account. Double-check your email address and try again.",
            });

          //validate password
          if (!user.comparePassword(req.body.password))
            return res
              .status(401)
              .json({ message: "Invalid email or password" });
          const token = user.generateJWT();
          // console.log(`token`,token);
          res.cookie("token", token, { httpOnly: true })
          return res.send({
            token: token,
            user: {
              userName: user.userName,
              roleType: user.roleType,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            },
          });
          // res.cookie("token", token, { expire: new Date() + 9999 });
          // Login successful, write token, and send back user
          // return res
          //   .status(200)
          //   .json({ token: user.generateJWT(), user: user });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    }
  );
};

// ===PASSWORD RECOVER AND RESET

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = (req, res) => {
  // console.log("Recover", req.body);
  EmployeeSchema.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res.status(401).json({
          message:
            "The email address " +
            req.body.email +
            " is not associated with any account. Double-check your email address and try again.",
        });

      //Generate and set password reset token
      user.generatePasswordReset();

      // Save the updated user object
      user
        .save()
        .then((user) => {
          // send email
          let link =
            process.env.CLIENT_URL + "/reset-pwd/" + user.resetPasswordToken;
          // console.log(link);
          const mailOptions = {
            to: user.email,
            from: `Customer Support <${process.env.MAIL_USER_NAME}>`,
            subject: "Password change request",
            text: `Hi ${user.userName} \n 
                    Please click on the following link ${link} to reset your password. \n\n 
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
          };

          // console.log(mailOptions);
          sendEmail(mailOptions, (error, result) => {
            if (error) return res.status(500).json({ message: error.message });
          });
          // sgMail.send(mailOptions, (error, result) => {
          //     if (error) return res.status(500).json({message: error.message});

          res.status(200).json({
            message: "A reset email has been sent to " + user.email + ".",
          });
          // });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
// exports.reset = (req, res) => {
//   console.log("reset");
//   EmployeeSchema.findOne({
//     resetPasswordToken: req.params.token,
//     resetPasswordExpires: { $gt: Date.now() },
//   })
//     .then((user) => {
//       if (!user)
//         return res
//           .status(401)
//           .json({ message: "Password reset token is invalid or has expired." });

//       //Redirect user to form with the email address
//       // res.redirect("www.google.com")
//       // res.sendFile('login.html', { root: path.join(__dirname, '../public/views/') });
//     })
//     .catch((err) => res.status(500).json({ message: err.message }));
// };

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = (req, res) => {
  // console.log(req.cookies.token);
  EmployeeSchema.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ message: "Password reset token is invalid or has expired." });

      //Set the new password
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      // Save
      user.save((err) => {
        if (err) return res.status(500).json({ message: err.message });

        // send email
        const mailOptions = {
          to: user.email,
          from: `Customer Support <${process.env.MAIL_USER_NAME}>`,
          subject: "Your password has been changed",
          text: `Hi ${user.userName} \n 
                    This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
        };
        sendEmail(mailOptions, (error, result) => {
          if (error) return res.status(500).json({ message: error.message });
        });
        // sgMail.send(mailOptions, (error, result) => {
        //     if (error) return res.status(500).json({message: error.message});

        res.status(200).json({ message: "Your password has been updated." });
        // });
      });
    })
    .catch((err) => res.status(401).json({ message: err.message }));
};
