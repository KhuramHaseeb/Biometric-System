import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveForm } from "../../store/action/action";

var vall;
const NavSetUp = (props) => {
  const dispatch = useDispatch()
  const url = "/dashboard";

  vall = localStorage.getItem('lastTab');
  // useEffect(() => {
  //   // console.log(g);
  //   // val = localStorage.getItem('lastTab')
  //   // console.log(localStorage.getItem('lastTab'));
  // }, [])
  const val = useSelector((state) => state.root.activeForm);
  console.log(val);

  const changeActiveIndicator = () => {
    dispatch(changeActiveForm(1));
    localStorage.setItem('lastTab', 1);
  };

  return (
    <li className="nav-item dropdown">
      <a
        className={`nav-link dropdown-toggle ${vall == 1 || val===1? "active-page" : ""}`}
        href="#"
        id="appsDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {/* <i className="nav-icon">
          <FiPackage />
        </i> */}
        Set Up
      </a>
      <ul
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="appsDropdown"
      >
        {/* <li>
          <a className="dropdown-item" href="chat.html">
            Chat App
          </a>
        </li> */}
        {/* <li>
          <Link
            className=" dropdown-item"
            to={`${url}/manageConstant`}
            onClick={changeActiveIndicator}
          >
            Manage Constant
          </Link>
        </li> */}
        <li>
          <Link
            className=" dropdown-item"
            to={`${url}/manageConstant`}
            state={val}
            onClick={changeActiveIndicator}
          >
            Manage Constant
          </Link>
        </li>
        {/* <li>
          <a className="dropdown-item" href="tasks.html">
            Tasks App
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="invoice.html">
            Invoice App
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="user-profile.html">
            User Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="calendar.html">
            Calendar
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="gallery.html">
            Gallery
          </a>
        </li>
        <li>
          <a
            className="dropdown-toggle sub-nav-link"
            href="#"
            id="layoutsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Layouts
          </a>
          <ul
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="layoutsDropdown"
          >
            <li>
              <a className="dropdown-item" href="default-layout.html">
                Default Layout
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="layout-without-search.html">
                Layout Without Search
              </a>
            </li>
          </ul>
        </li> */}
      </ul>
    </li>
  );
};

export default NavSetUp;
