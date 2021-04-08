import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveForm } from "../../store/action/action";
var vall;
const NavForms = () => {
  const url = "/dashboard";

  const dispatch = useDispatch();
  const val = useSelector((state) => state.root.activeForm);
  vall = localStorage.getItem("lastTab");

  const changeActiveIndicator = () => {
    dispatch(changeActiveForm(2));
    localStorage.setItem("lastTab", 2);
  };

  return (
    <li className="nav-item dropdown">
      <a
        className={`nav-link dropdown-toggle ${
          vall == 2 || val === 2 ? "active-page" : ""
        }`}
        // href="#"
        id="formsDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Forms
      </a>
      <ul
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="formsDropdown"
      >
        <li>
          <Link
            className=" dropdown-item"
            to={`${url}/manageEmployee`}
            onClick={changeActiveIndicator}
          >
            Manage Employee
          </Link>
        </li>

        <li>
          <Link
            className=" dropdown-item"
            to={`${url}/manageDesignation`}
            onClick={changeActiveIndicator}
          >
            Manage Designation
          </Link>
        </li>
        <li>
          <Link
            className=" dropdown-item"
            to={`${url}/manageDepartment`}
            onClick={changeActiveIndicator}
          >
            Manage Department
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default NavForms;
