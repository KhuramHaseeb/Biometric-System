import React from "react";
import { Route, Routes } from "react-router";
import HeaderBar from "../Header/HeaderBar";
import MainContainer from "./MainContainer";
import NavBar from "./NavBar";
import UserProfile from "../UserProfile";
import DashboardError from "../Error/Dashboard404";
import "react-toastify/dist/ReactToastify.css";

const UserDashboard = () => {
  return (
    <div className="container pb-5">
      <HeaderBar />
      <NavBar />
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="*" element={<DashboardError />} />
      </Routes>
    </div>
  );
};

export default UserDashboard;
