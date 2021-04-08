import React from "react";
import Header from "../Header";
import MainContainer from "../MainContainer/MainContainer";
import { Routes, Route } from "react-router-dom";
import AddEmployee from "../FormsNav/AddEmployee";
import DashboardError from "../Error/Dashboard404";
import AddConstant from "../SetUpNav/constant/AddConstant";
import AddDepartment from "../FormsNav/AddDepartment";
import AddDesignation from "../FormsNav/AddDesignation";
import ManageConstant from "../SetUpNav/constant/ManageConstant";
import ManageEmployee from "../FormsNav/ManageEmployee";
import ManageDepartment from "../FormsNav/ManageDepartment";
import ManageDesignation from "../FormsNav/ManageDesignation";
import AttendanceSheet from "../AttendenceSheet/NavAttendenceSheet";
import AttendenceSheetById from "../AttendenceSheet/NavAttendenceSheetByid";
import UploadAttendenceFile from "../AttendenceSheet/uploadAttendenceFile";
import UserProfile from "../UserProfile";

const Dashboard = () => {
  return (
    <div className="container pb-5">
      <Header />
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="/manageEmployee" element={<ManageEmployee />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/manageConstant" element={<ManageConstant />} />
        <Route path="/addConstant" element={<AddConstant />} />
        <Route path="/manageDepartment" element={<ManageDepartment />} />
        <Route path="/addDepartment" element={<AddDepartment />} />
        <Route path="/manageDesignation" element={<ManageDesignation />} />
        <Route path="/addDesignation" element={<AddDesignation />} />
        <Route path="/attendenceSheet" element={<AttendanceSheet />} />
        <Route
          path="/attendenceSheetbyid/:id"
          element={<AttendenceSheetById />}
        />
        <Route
          path="/uploadAttendenceFile"
          element={<UploadAttendenceFile />}
        />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="*" element={<DashboardError />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
