import React from "react";
import { Link } from "react-router-dom";
import NavDashboard from "../NavBar/NavDashboard";
// import NavSetUp from "./NavSetUp";
// import NavForms from "./NavForms";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#retailAdminNavbar"
        aria-controls="retailAdminNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon">
          <i />
          <i />
          <i />
        </span>
      </button>
      <div className="collapse navbar-collapse" id="retailAdminNavbar">
        <ul className="navbar-nav m-auto">
          <NavDashboard routeName="udashboard"/>
          {/* <NavSetUp />
          <NavForms /> */}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
