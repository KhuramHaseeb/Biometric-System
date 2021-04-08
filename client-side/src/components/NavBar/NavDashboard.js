import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDevicesOther } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveForm } from "../../store/action/action";
var vall;
const NavDashboard = ({routeName}) => {
  const dispatch = useDispatch();
  const val = useSelector((state) => state.root.activeForm);

  vall = localStorage.getItem('lastTab');
  // useEffect(() => {
  // }, [])

  const changeActiveIndicator = () => {
    dispatch(changeActiveForm(0));
    localStorage.setItem('lastTab', 0);
  };

  return (
    <li className="nav-item">
      <Link
        className={`nav-link ${vall == 0? "active-page" : ""}`}
        to={`/${routeName}`}
        onClick={changeActiveIndicator}
      >
        {/* <i className="nav-icon">
          <MdDevicesOther />
        </i> */}
        Dashboard
      </Link>
    </li>
  );
};

export default NavDashboard;
