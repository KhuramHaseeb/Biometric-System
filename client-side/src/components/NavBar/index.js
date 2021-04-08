import React from "react";
import { Link } from "react-router-dom";
import NavSetUp from "./NavSetUp";
import NavDashboard from "./NavDashboard";
import NavForms from "./NavForms";
import Attentdence from './NavAttendence';
import NavGraphs from "./NavGraphs";
import NavLoginSignup from "./NavLoginSignup";
import NavTables from "./NavTables";
import NavUIElements from "./NavUIElements";

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
          <NavDashboard routeName="dashboard"/>
          <NavSetUp />
          <NavForms />
          <Attentdence />
          {/* <NavUIElements /> */}
          {/* <NavTables /> */}
          {/* <NavGraphs />  */}
          {/* <NavLoginSignup /> */}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
