import React from "react";
import { Link } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveForm } from "../../store/action/action";

const NavAppPages = (props) => {
  const url = "/dashboard";

  const dispatch = useDispatch();
  const val = useSelector((state) => state.root.activeForm);

  const changeActiveIndicator = () => {
    dispatch(changeActiveForm(2));
  };

  return (
    <li className="nav-item dropdown">
      <a
        className={`nav-link dropdown-toggle ${val === 1 ? "active-page" : ""}`}
        href="#"
        id="appsDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="nav-icon">
          <FiPackage />
        </i>
        Apps/Pages
      </a>
      <ul
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="appsDropdown"
      >
        <li>
          <a className="dropdown-item" href="chat.html">
            Chat App
          </a>
        </li>
        <li>
          <Link
            className="dropdown-item"
            to={`${url}/pricing`}
            onClick={changeActiveIndicator}
          >
            Pricing Plans
          </Link>
        </li>
        <li>
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
        </li>
      </ul>
    </li>
  );
};

export default NavAppPages;
