import React from "react";
import NavDashboard from "../NavBar/NavDashboard";

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
          <NavDashboard routeName="udashboard" />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
