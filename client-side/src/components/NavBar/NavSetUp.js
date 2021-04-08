import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveForm } from "../../store/action/action";

var vall;
const NavSetUp = () => {
  const dispatch = useDispatch();
  const url = "/dashboard";

  vall = localStorage.getItem("lastTab");
  const val = useSelector((state) => state.root.activeForm);
  console.log(val);

  const changeActiveIndicator = () => {
    dispatch(changeActiveForm(1));
    localStorage.setItem("lastTab", 1);
  };

  return (
    <li className="nav-item dropdown">
      <a
        className={`nav-link dropdown-toggle ${
          vall == 1 || val === 1 ? "active-page" : ""
        }`}
        href="#"
        id="appsDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Set Up
      </a>
      <ul
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="appsDropdown"
      >
        <li>
          <Link
            className=" dropdown-item"
            to={`${url}/manageConstant`}
            onClick={changeActiveIndicator}
          >
            Manage Constant
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default NavSetUp;
