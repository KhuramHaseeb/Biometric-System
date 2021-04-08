import React from "react";
import { Route, Routes } from "react-router";
import Header from "../Header";
import HeaderBar from "../Header/HeaderBar";
import MainContainer from "./MainContainer";
import NavBar from "./NavBar";

const UserDashboard = () => {
  return (
    <div className="container pb-5">
      <HeaderBar />
      <NavBar />
      <Routes>
        <Route path="/" element={<MainContainer />} />
      </Routes>
    </div>
  );
};

export default UserDashboard;
