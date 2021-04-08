import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import url from "../../url.json";
import { SuccessToast, ErrorToast } from "../../utils/ReactToastify";

const ForgotPass = () => {
  const handleSubmit = (values) => {
    axios
      .post(`${url.auth}/recover`, { email: values.userName })
      .then((json) => {
        console.log("jsonData", json);
        SuccessToast("👉 Please check your email inbox for reset link 📧");
      })
      .catch((err) => {
        console.log("Error", err);
        ErrorToast("❌ Email is invalid");
      });
  };

  const initialValues = {
    userName: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(8, "Must be above 8 characters long")
      .required("Please enter the required field"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="row justify-content-md-center">
          <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
            <div className="login-screen">
              <div className="login-box">
                <Link to="/" className="login-logo">
                  <span className="text-danger">R</span>
                  <span className="text-warning">e</span>
                  <span className="text-success">t</span>
                  <span className="text-info">a</span>
                  <span className="text-royal-orange">i</span>
                  <span className="text-jungle-green">l</span>
                </Link>
                <h5 className="mr-5">
                  In order to access your dashboard, please enter the email id
                  you provided during the registration process.
                </h5>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.userName && Boolean(formik.errors.userName)
                        ? "is-invalid"
                        : ""
                    }`}
                    id="inputUserName"
                    name="userName"
                    placeholder="Enter Email"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    aria-describedby="userName"
                  />
                  <small id="userName" className="text-danger">
                    {formik.touched.userName && formik.errors.userName}
                  </small>
                </div>
                <div className="actions">
                  <button type="submit" className="btn btn-danger btn-lg">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPass;
