import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import url from "../../url.json";

const ResetPass = () => {
  const { token } = useParams();
  console.log(token);
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    axios
      .post(`${url.auth}/reset/${token}`, {
        password: values.password,
      })
      .then((json) => {
        console.log("jsonData", json);
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const initialValues = {
    password: "",
    confirmPass: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Must be above 8 characters long")
      .max(15, "Must be 15 characters or less")
      .required("Please enter the required field"),
    confirmPass: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
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
          <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
            <div className="login-screen">
              <div className="login-box">
                <a href="#" className="login-logo">
                  <span className="text-danger">R</span>
                  <span className="text-warning">e</span>
                  <span className="text-success">t</span>
                  <span className="text-info">a</span>
                  <span className="text-royal-orange">i</span>
                  <span className="text-jungle-green">l</span>
                </a>
                <h5>
                  Welcome back,
                  <br />
                  Please Change your Password.
                </h5>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control ${
                      formik.touched.password && Boolean(formik.errors.password)
                        ? "is-invalid"
                        : ""
                    }`}
                    id="inputPassword"
                    name="password"
                    placeholder="New Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    aria-describedby="password"
                  />
                  <small id="password" className="text-danger">
                    {formik.touched.password && formik.errors.password}
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control ${
                      formik.touched.confirmPass &&
                      Boolean(formik.errors.confirmPass)
                        ? "is-invalid"
                        : ""
                    }`}
                    id="inputConfirmPass"
                    name="confirmPass"
                    placeholder="Confirm Password"
                    value={formik.values.confirmPass}
                    onChange={formik.handleChange}
                    aria-describedby="confirmPass"
                  />
                  <small id="confirmPass" className="text-danger">
                    {formik.touched.confirmPass && formik.errors.confirmPass}
                  </small>
                </div>
                <div className="actions">
                  <button type="submit" className="btn btn-info">
                    Change Password
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

export default ResetPass;
