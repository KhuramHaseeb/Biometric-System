import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import url from "../../../url.json";
import PageHeader from "../../../utils/PageHeader";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { SuccessToast, ErrorToast } from "../../../utils/ReactToastify";

const AddConstant = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [getConstant_typeId, setGetConstant_typeId] = useState([]);
  const [submit, setSubmit] = useState(false);

  const initialValues = {
    id: state?.id ? state.id : "",
    Name: state?.name ? state.name : "",
    code: state?.code ? state.code : "",
    value: state?.value ? state.value : "",
    typeId: state?.typeId ? state.typeId : "",
  };

  useEffect(() => {
    axios
      .get(`${url.constant}/getConstant_typeId`, {
        params: { typeId: 0 },
      })
      .then((json) => {
        console.log("jsonData", json.data);
        setGetConstant_typeId(json.data);
        setLoading(false);
      });
  }, [submit]);

  const validationSchema = Yup.object().shape({
    id: Yup.number().required("Please enter the required field"),
    code: Yup.string()
      .min(3, "Must be above 3 characters long")
      .max(15, "Must be 15 characters or less")
      .required("Please enter the required field"),
    Name: Yup.string()
      .min(2, "Must be above 2 characters long")
      .max(15, "Must be 15 characters or less")
      .required("Please enter the required field"),
    value: Yup.number().required("Please enter the required field"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    state
      ? axios
          .post(`${url.constant}/updateConstant_typeId`, {
            params: { constantId: state.constantId },
            body: {
              constantId: state ? state.constantId : getConstant_typeId.nextId,
              id: values.id,
              code: values.code,
              name: values.Name.toLowerCase().replace(/\b(\w)/g, (s) =>
                s.toUpperCase()
              ),
              value: values.value,
              typeId: values.typeId ? values.typeId : 0,
            },
          })
          .then((json) => {
            SuccessToast("👏 Updated successfully");
            navigate("/dashboard/manageConstant");
            console.log("data:", json);
          })
          .catch((err) => {
            ErrorToast("❌ Something is wrong");
          })
      : axios
          .post(`${url.constant}/addConstant`, {
            constantId: state ? state.constantId : getConstant_typeId.nextId,
            id: values.id,
            code: values.code,
            Name: values.Name.toLowerCase().replace(/\b(\w)/g, (s) =>
              s.toUpperCase()
            ),
            value: values.value,
            typeId: values.typeId,
          })
          .then((json) => {
            SuccessToast("👏 New constant is added successfully");
            formik.resetForm();
            setSubmit(!submit);
            console.log("data:", json);
          })
          .catch((err) => {
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
        title="Add Constant"
        link1={
          <Link to="/dashboard/manageConstant">
            <div id="reportrange">
              <i style={{ margin: "auto" }}>
                <FaArrowLeft style={{ paddingRight: "2px" }} />
                Manage Constant
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
                        <label htmlFor="inputId">ID*</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.id && Boolean(formik.errors.id)
                              ? "is-invalid"
                              : ""
                          }`}
                          id="inputId"
                          name="id"
                          placeholder="Enter ID"
                          value={formik.values.id}
                          onChange={formik.handleChange}
                          aria-describedby="Id"
                        />
                        <small id="Id" className="text-danger">
                          {formik.touched.id && formik.errors.id}
                        </small>
                      </div>
                    </div>
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
                        <label htmlFor="inputName">Name*</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.Name && Boolean(formik.errors.Name)
                              ? "is-invalid"
                              : ""
                          }`}
                          name="Name"
                          value={formik.values.Name.toLowerCase().replace(
                            /\b(\w)/g,
                            (s) => s.toUpperCase()
                          )}
                          onChange={formik.handleChange}
                          id="inputName"
                          placeholder="Enter Name"
                          aria-describedby="Name"
                        />
                        <small id="Name" className="text-danger">
                          {formik.touched.Name && formik.errors.Name}
                        </small>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputvalue">Value*</label>
                        <input
                          type="number"
                          className={`form-control ${
                            formik.touched.value && Boolean(formik.errors.value)
                              ? "is-invalid"
                              : ""
                          }`}
                          id="inputvalue"
                          name="value"
                          value={formik.values.value}
                          onChange={formik.handleChange}
                          aria-describedby="value"
                          placeholder="Enter Value No"
                        />
                        <small id="value" className="text-danger">
                          {formik.touched.value && formik.errors.value}
                        </small>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputtypeId">Parent</label>
                        <select
                          className="form-control"
                          id="inputtypeId"
                          name="typeId"
                          value={formik.values.typeId}
                          onChange={formik.handleChange}
                          aria-describedby="typeId"
                        >
                          <option value="">
                            {!loading ? "Select One" : "Loading . . ."}
                          </option>
                          {getConstant_typeId.data?.map(
                            ({ name, constantId }, i) =>
                              name ? (
                                <option key={constantId} value={constantId}>
                                  {name
                                    .toLowerCase()
                                    .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                                </option>
                              ) : null
                          )}
                        </select>
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

export default AddConstant;
