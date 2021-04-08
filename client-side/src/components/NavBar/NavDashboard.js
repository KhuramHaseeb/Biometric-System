import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveForm } from "../../store/action/action";
var vall;
const NavDashboard = ({ routeName }) => {
  const dispatch = useDispatch();

  vall = localStorage.getItem("lastTab");

  const changeActiveIndicator = () => {
    dispatch(changeActiveForm(0));
    localStorage.setItem("lastTab", 0);
  };

  return (
    <li className="nav-item">
      <Link
        className={`nav-link ${vall == 0 ? "active-page" : ""}`}
        to={`/${routeName}`}
        onClick={changeActiveIndicator}
      >
        Dashboard
      </Link>
    </li>
  );
};

export default NavDashboard;
