import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import url from "../../url.json";
import PageHeader from "../../utils/PageHeader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { SuccessToast, ErrorToast } from "../../utils/ReactToastify";

const AddDepartment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialValues = {
    Name: state?.name ? state.name : "",
    code: state?.code ? state.code : "",
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .min(3, "Must be above 3 characters long")
      .max(15, "Must be 15 characters or less")
      .required("Please enter the required field"),
    Name: Yup.string()
      .min(3, "Must be above 3 characters long")
      .max(25, "Must be 25 characters or less")
      .required("Please enter the required field"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    state
      ? axios
          .post(`${url.department}/updateDepartment`, {
            params: { id: state.id },
            body: {
              id: state.id,
              code: values.code,
              name: values.Name.toLowerCase().replace(/\b(\w)/g, (s) =>
                s.toUpperCase()
              ),
            },
          })
          .then((json) => {
            SuccessToast("👏 Updated successfully");
            navigate("/dashboard/manageDepartment");
            console.log("data:", json);
          })
          .catch(() => {
            ErrorToast("❌ Something is wrong");
          })
      : axios
          .post(`${url.department}/addDepartment`, {
            code: values.code,
            Name: values.Name,
          })
          .then((json) => {
            SuccessToast("👏 New Department is added successfully");
            formik.resetForm();
            console.log("data:", json);
          })
          .catch(() => {
            ErrorToast("❌ Something is wrong");
          });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="main-container">
      <PageHeader
        title="Add Department"
        link1={
          <Link to="/dashboard/manageDepartment">
            <div id="reportrange">
              <i style={{ margin: "auto" }}>
                <FaArrowLeft style={{ paddingRight: "2px" }} />
                Manage Department
              </i>
            </div>
          </Link>
        }
      />
      <div className="content-wrapper">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row gutters">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputcode">Code*</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.code && Boolean(formik.errors.code)
                              ? "is-invalid"
                              : ""
                          }`}
                          id="inputcode"
                          value={formik.values.code}
                          onChange={formik.handleChange}
                          name="code"
                          placeholder="Enter Code"
                          aria-describedby="code"
                        />
                        <small id="code" className="text-danger">
                          {formik.touched.code && formik.errors.code}
                        </small>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputName">Department Name*</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.Name && Boolean(formik.errors.Name)
                              ? "is-invalid"
                              : ""
                          }`}
                          name="Name"
                          value={formik.values.Name}
                          onChange={formik.handleChange}
                          id="inputName"
                          placeholder="Enter Department Name"
                          aria-describedby="Name"
                        />
                        <small id="Name" className="text-danger">
                          {formik.touched.Name && formik.errors.Name}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className={`btn btn-lg ${
                        !state ? "btn-primary" : "btn-success"
                      }`}
                    >
                      {state ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
