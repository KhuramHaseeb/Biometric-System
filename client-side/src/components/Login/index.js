import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import url from "../../url.json";
// import "../../assets/css/bootstrap.min.css";
// import "../../assets/css/main.css";
import { useDispatch, useSelector } from "react-redux";
import { userLoginDetails, loggedIn } from "../../store/action/action";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const Selector = useSelector((state) => {
  //   console.log("State", state);
  //   return state.root.isLogin;
  // });
  // var getting = browser.cookies.get(token);
  // console.log(getting);
  // console.log(document.cookie);
  const handleSubmit = (values) => {
    axios
      .post(`${url.auth}/login`, {
        userName: values.userName,
        password: values.password,
      })
      .then((json) => {
        axios
          .get(`${url.constant}/getConstant_typeId`, {
            params: { typeId: 1 },
          })
          .then((d) => {
            // setGetRoleType(json.data);
            // var type;
            d.data.data?.map(({ name, id }, i) => {
              if (json.data.user.roleType === id) {
                // type = name;
                localStorage.setItem('lastTab', 0);
                localStorage.setItem('token', json.data.token);
                console.log("hhhh",json.data.token);
                dispatch(userLoginDetails({ auth: json.data, roleType: name }));
                dispatch(loggedIn(true))
                navigate("/");
                console.log(name);
              }
            });

            // console.log("jsonData", json);
            // setRoleLoading(false);
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
    // e.preventDefault();
    // navigate(`/dashboard`);
  };

  const initialValues = {
    userName: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(8, "Must be above 8 characters long")
      .max(15, "Must be 15 characters or less")
      .required("Please enter the required field"),
    password: Yup.string()
      .min(8, "Password must be above 8 characters long")
      .max(15, "Password must be 15 characters or less")
      .required("Password is required"),
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
                <Link to="/" className="login-logo">
                  <span className="text-danger">R</span>
                  <span className="text-warning">e</span>
                  <span className="text-success">t</span>
                  <span className="text-info">a</span>
                  <span className="text-royal-orange">i</span>
                  <span className="text-jungle-green">l</span>
                </Link>
                <h5>
                  Welcome back,
                  <br />
                  Please Login to your Account.
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
                    placeholder="Enter User Name"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    aria-describedby="userName"
                  />
                  <small id="userName" className="text-danger">
                    {formik.touched.userName && formik.errors.userName}
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control ${
                      formik.touched.password && Boolean(formik.errors.password)
                        ? "is-invalid"
                        : ""
                    }`}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    id="inputPassword"
                    placeholder="Enter Password"
                    aria-describedby="password"
                  />
                  <small id="password" className="text-danger">
                    {formik.touched.password && formik.errors.password}
                  </small>
                </div>
                <div className="actions">
                  <Link to="/forgot-pwd">Recover password</Link>
                  <button type="submit" className="btn btn-info">
                    Login
                  </button>
                </div>
                {/* <div className="m-0">
                  <span className="additional-link">
                    No account? <Link to="/signup">Signup Now</Link>
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
