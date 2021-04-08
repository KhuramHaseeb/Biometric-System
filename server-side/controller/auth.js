const EmployeeSchema = require("../model/employee");
const { sendEmail } = require("../utils/sendmail");
const path = require("path");
require("dotenv").config();

// @route POST api/auth/register
exports.register = (req, res) => {
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
exports.login = (req, res) => {
  EmployeeSchema.findOne({ userName: req.body.userName }, { email: 1 }).then(
    (d) => {
      if (!d)
        return res.status(401).json({
          msg:
            "The username " +
            req.body.userName +
            " is not associated with any account. Double-check your username and try again.",
        });

      EmployeeSchema.findOne({ email: d.email })
        .then((user) => {
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
          res.cookie("token", token, { httpOnly: true });
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
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    }
  );
};

exports.logout = (req, res) => {
  console.log("logout");
  res
    .cookie("token", "", { expires: new Date(0) })
    .json({ message: "Signout success!" });
};

// PASSWORD RECOVER AND RESET
exports.recover = (req, res) => {
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
          const mailOptions = {
            to: user.email,
            from: `Customer Support <${process.env.MAIL_USER_NAME}>`,
            subject: "Password change request",
            text: `Hi ${user.userName} \n 
                    Please click on the following link ${link} to reset your password. \n\n 
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
          };

          sendEmail(mailOptions, (error, result) => {
            if (error) return res.status(500).json({ message: error.message });
          });

          res.status(200).json({
            message: "A reset email has been sent to " + user.email + ".",
          });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

// @route POST api/auth/reset
exports.resetPassword = (req, res) => {
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
        res.status(200).json({ message: "Your password has been updated." });
      });
    })
    .catch((err) => res.status(401).json({ message: err.message }));
};
