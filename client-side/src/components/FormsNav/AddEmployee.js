import React, { useEffect, useState } from "react";
import PageHeader from "../../utils/PageHeader";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import url from "../../url.json";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { SuccessToast, ErrorToast } from "../../utils/ReactToastify";

const AddEmployee = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [getDesignation, setGetDesignation] = useState([]);
  const [getDepartment, setGetDepartment] = useState([]);
  const [getRoleType, setGetRoleType] = useState([]);

  useEffect(() => {
    axios
      .get(`${url.designation}/getDesignation`, {
        params: {},
      })
      .then((json) => {
        setGetDesignation(json.data);
      });
    axios
      .get(`${url.department}/getDepartment`, {
        params: {},
      })
      .then((json) => {
        setGetDepartment(json.data);
      });
    axios
      .get(`${url.constant}/getConstant_typeId`, {
        params: { typeId: 1 },
      })
      .then((json) => {
        console.log(json.data);
        setGetRoleType(json.data);
      });
  }, []);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    userName: state?.userName ? state.userName : "",
    firstName: state?.firstName ? state.firstName : "",
    lastName: state?.lastName ? state.lastName : "",
    fatherName: state?.fatherName ? state.fatherName : "",
    checkIn: state?.checkIn ? state.checkIn : "",
    checkOut: state?.checkOut ? state.checkOut : "",
    department: state?.department ? state.department : "",
    designation: state?.designation ? state.designation : "",
    cell: state?.cell ? state.cell : "03",
    isActive: true,
    adminId: "",
    checkPass: state ? false : true,
    joiningDate: state?.joiningDate
      ? new Date(state.joiningDate).toISOString().substr(0, 10)
      : new Date().toISOString().substr(0, 10),
    password: "",
    email: state?.email ? state.email : "",
    role: state?.roleType ? state.roleType : "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(8, "Must be above 8 characters long")
      .max(15, "Must be 15 characters or less")
      .required("Please enter the required field"),
    firstName: Yup.string()
      .min(3, "Must be above 3 characters long")
      .max(15, "Must be 15 characters or less")
      .required("Please enter the required field"),
    lastName: Yup.string()
      .min(3, "Must be above 3 characters long")
      .max(15, "Must be 15 characters or less")
      .required("Please enter the required field"),
    fatherName: Yup.string()
      .min(3, "Must be above 3 characters long")
      .max(15, "Must be 15 characters or less")
      .required("Please enter the required field"),
    cell: Yup.string()
      .min(11, "Must be 11 characters long")
      .max(11, "Must be 11 characters long")
      .required("Please enter the required field")
      .matches(phoneRegExp, "Phone number is not valid"),
    joiningDate: Yup.date().required("Please enter the required field"),
    checkIn: Yup.number()
      .min(0, "Must be above 0 characters long")
      .required("CheckIn ID is required"),
    checkOut: Yup.number()
      .min(0, "Must be above 0 characters long")
      .required("CheckOut ID is required"),
    checkPass: Yup.boolean(),
    password: Yup.string().when("checkPass", {
      is: true,
      then: Yup.string()
        .min(8, "Password must be above 8 characters long")
        .max(15, "Password must be 15 characters or less")
        .required("Password is required"),
    }),
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    role: Yup.string().required("Email is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    var bodyVal = {
      userName: values.userName,
      firstName: values.firstName
        .toLowerCase()
        .replace(/\b(\w)/g, (s) => s.toUpperCase()),
      lastName: values.lastName
        .toLowerCase()
        .replace(/\b(\w)/g, (s) => s.toUpperCase()),
      fatherName: values.fatherName
        .toLowerCase()
        .replace(/\b(\w)/g, (s) => s.toUpperCase()),
      cell: values.cell,
      department: values.department,
      designation: values.designation,
      joiningDate: values.joiningDate,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      email: values.email,
      roleType: values.role,
      adminId: "",
    };
    if (values.password !== "") bodyVal["password"] = values.password;
    state
      ? axios
          .post(`${url.employee}/updateEmployee`, {
            params: { id: state.id },
            body: bodyVal,
          })
          .then((json) => {
            SuccessToast("👏 Updated successfully");
            navigate("/dashboard/manageEmployee");
            console.log("data:", json);
          })
          .catch(() => {
            ErrorToast("❌ Something is wrong");
          })
      : axios
          .post(`${url.employee}/addEmployee`, {
            ...bodyVal,
          })
          .then((json) => {
            SuccessToast("👏 New Employee is added successfully");
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
        title="Add Employee"
        link1={
          <Link to="/dashboard/manageEmployee">
            <div id="reportrange">
              <i style={{ margin: "auto" }}>
                <FaArrowLeft style={{ paddingRight: "2px" }} />
                Manage Employee
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
                        <label htmlFor="inputUserName">User Name*</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.userName &&
                            Boolean(formik.errors.userName)
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
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputFirstName">First Name*</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.firstName &&
                            Boolean(formik.errors.firstName)
                              ? "is-invalid"
                              : ""
                          }`}
                          id="inputFirstName"
                          name="firstName"
                          placeholder="Enter First Name"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          aria-describedby="firstName"
                        />
                        <small id="firstName" className="text-danger">
                          {formik.touched.firstName && formik.errors.firstName}
                        </small>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputLastName">Last Name*</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.lastName &&
                            Boolean(formik.errors.lastName)
                              ? "is-invalid"
                              : ""
                          }`}
                          id="inputLastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          name="lastName"
                          placeholder="Enter Last Name"
                          aria-describedby="lastName"
                        />
                        <small id="lastName" className="text-danger">
                          {formik.touched.lastName && formik.errors.lastName}
                        </small>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputFatherName">Father Name*</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.fatherName &&
                            Boolean(formik.errors.fatherName)
                              ? "is-invalid"
                              : ""
                          }`}
                          name="fatherName"
                          value={formik.values.fatherName}
                          onChange={formik.handleChange}
                          id="inputFatherName"
                          placeholder="Enter Father Name"
                          aria-describedby="fatherName"
                        />
                        <small id="fatherName" className="text-danger">
                          {formik.touched.fatherName &&
                            formik.errors.fatherName}
                        </small>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputEmail">Email*</label>
                        <input
                          type="email"
                          className={`form-control ${
                            formik.touched.email && Boolean(formik.errors.email)
                              ? "is-invalid"
                              : ""
                          }`}
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          id="inputEmail"
                          placeholder="Enter Email Address"
                          aria-describedby="email"
                        />
                        <small id="email" className="text-danger">
                          {formik.touched.email && formik.errors.email}
                        </small>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputPassword">Password*</label>
                        <input
                          type="password"
                          className={`form-control ${
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                              ? "is-invalid"
                              : ""
                          }`}
                          name="password"
                          value={formik.values.password}
                          onChange={(e) => {
                            formik.handleChange(e);
                            if (state)
                              e.target.value !== ""
                                ? formik.setFieldValue("checkPass", true)
                                : formik.setFieldValue("checkPass", false);
                          }}
                          id="inputPassword"
                          placeholder="Enter Password"
                          aria-describedby="password"
                        />
                        <small id="password" className="text-danger">
                          {formik.touched.password && formik.errors.password}
                        </small>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputCellNo">Cell No*</label>
                        <input
                          type="tel"
                          className={`form-control ${
                            formik.touched.cell && Boolean(formik.errors.cell)
                              ? "is-invalid"
                              : ""
                          }`}
                          id="inputCellNo"
                          name="cell"
                          value={formik.values.cell}
                          onChange={formik.handleChange}
                          aria-describedby="cell"
                          placeholder="Enter Cell No"
                        />
                        <small id="cell" className="text-danger">
                          {formik.touched.cell && formik.errors.cell}
                        </small>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputJoiningDate">Joining On*</label>
                        <input
                          type="date"
                          name="joiningDate"
                          value={formik.values.joiningDate}
                          onChange={formik.handleChange}
                          aria-describedby="joiningDate"
                          className={`form-control ${
                            formik.touched.joiningDate &&
                            Boolean(formik.errors.joiningDate)
                              ? "is-invalid"
                              : ""
                          }`}
                          id="inputJoiningDate"
                        />
                        <small id="joiningDate" className="text-danger">
                          {formik.touched.joiningDate &&
                            formik.errors.joiningDate}
                        </small>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputCheckIn">Check In*</label>
                        <input
                          type="number"
                          id="inputCheckIn"
                          name="checkIn"
                          value={formik.values.checkIn}
                          onChange={formik.handleChange}
                          aria-describedby="checkIn"
                          className={`form-control ${
                            formik.touched.checkIn &&
                            Boolean(formik.errors.checkIn)
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter 'Check In' ID"
                        />
                        <small id="checkIn" className="text-danger">
                          {formik.touched.checkIn && formik.errors.checkIn}
                        </small>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputCheckOut">Check Out*</label>
                        <input
                          type="number"
                          name="checkOut"
                          value={formik.values.checkOut}
                          onChange={formik.handleChange}
                          aria-describedby="checkOut"
                          className={`form-control ${
                            formik.touched.checkOut &&
                            Boolean(formik.errors.checkOut)
                              ? "is-invalid"
                              : ""
                          }`}
                          id="inputcheckOut"
                          placeholder="Enter 'Check Out' ID"
                        />
                        <small id="checkOut" className="text-danger">
                          {formik.touched.checkOut && formik.errors.checkOut}
                        </small>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputDepartment">Department*</label>
                        <select
                          className="form-control"
                          id="inputDepartment"
                          name="department"
                          value={formik.values.department}
                          onChange={formik.handleChange}
                        >
                          <option value="">
                            {getDesignation.length !== 0
                              ? "Select One"
                              : "Loading . . ."}
                          </option>
                          {getDepartment?.map(({ name, id }, i) =>
                            name ? (
                              <option key={name} value={id}>
                                {name
                                  .toLowerCase()
                                  .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                              </option>
                            ) : null
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputDesignation">Designation*</label>
                        <select
                          className="form-control"
                          id="inputDesignation"
                          name="designation"
                          value={formik.values.designation}
                          onChange={formik.handleChange}
                        >
                          <option value="">
                            {getDesignation.length !== 0
                              ? "Select One"
                              : "Loading . . ."}
                          </option>
                          {getDesignation?.map(({ name, id }, i) =>
                            name ? (
                              <option key={name} value={id}>
                                {name
                                  .toLowerCase()
                                  .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                              </option>
                            ) : null
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="inputRole">Employee Type*</label>
                        <select
                          className="form-control"
                          id="inputRole"
                          name="role"
                          value={formik.values.role}
                          onChange={formik.handleChange}
                        >
                          <option value="">
                            {getRoleType?.length !== 0
                              ? "Select One"
                              : "Loading . . ."}
                          </option>
                          {getRoleType.data?.map(({ name, constantId }, i) =>
                            name ? (
                              <option key={name} value={constantId}>
                                {name
                                  .toLowerCase()
                                  .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                              </option>
                            ) : null
                          )}
                        </select>
                      </div>
                    </div>
                    {state?.id ? (
                      <>
                        <div className="col-12">
                          <label>
                            <span style={{ fontWeight: "bold" }}>
                              Created At:
                            </span>{" "}
                            {state?.createdAt
                              ? new Date(state.createdAt).toLocaleString()
                              : ""}
                          </label>
                          <br />
                          <label>
                            <span style={{ fontWeight: "bold" }}>
                              Updated At:
                            </span>{" "}
                            {console.log(state.updatedAt)}
                            {state.createdAt >= state.updatedAt
                              ? "Not Available"
                              : new Date(state.updatedAt).toLocaleString()}
                          </label>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
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
export default AddEmployee;
