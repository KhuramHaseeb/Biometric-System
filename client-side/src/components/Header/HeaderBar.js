import React from "react";
import { Link } from "react-router-dom";
import user from "../../assets/img/user.png";
import user2 from "../../assets/img/user2.png";
import user3 from "../../assets/img/user3.png";
import notification from "../../assets/img/notification.svg";
import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/action/action";

const HeaderBar = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.root.userDetails);

  return (
    <header className="header">
      <div className="row gutters">
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
          <Link to="/" className="logo">
            EMS
          </Link>
        </div>
        <div className="col-xl-8 col-lg-8 col-md-6 col-sm-6 col-6">
          <ul className="header-actions">
            <li className="dropdown d-none d-sm-block">
              <Link
                to="#"
                id="notifications"
                data-toggle="dropdown"
                aria-haspopup="true"
              >
                <img
                  src={notification}
                  alt="notifications"
                  className="list-icon"
                />
              </Link>
              <div
                className="dropdown-menu lrg"
                aria-labelledby="notifications"
              >
                <div className="dropdown-menu-header">
                  <h5>Notifications</h5>
                  <p className="m-0 sub-title">
                    You have 5 unread notifications
                  </p>
                </div>
                <ul className="header-notifications">
                  <li>
                    <Link to="#" className="clearfix">
                      <div className="avatar">
                        <img src={user} alt="avatar" />
                        <span className="notify-iocn icon-drafts text-danger" />
                      </div>
                      <div className="details">
                        <h6>Corey Haggard</h6>
                        <p>This is so good, I can't stop watching.</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="clearfix">
                      <div className="avatar">
                        <img src={user2} alt="avatar" />
                        <span className="notify-iocn icon-layers text-info" />
                      </div>
                      <div className="details">
                        <h6>Eric R. Mortensen</h6>
                        <p>Eric sent you a file. Download now</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="clearfix">
                      <div className="avatar">
                        <img src={user3} alt="avatar" />
                        <span className="notify-iocn icon-person_add text-success" />
                      </div>
                      <div className="details">
                        <h6>Gleb Kuznetsov</h6>
                        <p>Stella, Added you as a Friend. Accept.</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="dropdown">
              <Link
                to="#"
                id="userSettings"
                className="user-settings"
                data-toggle="dropdown"
                aria-haspopup="true"
              >
                <span className="user-name">{`${userDetails.auth?.firstName} ${userDetails.auth?.lastName}`}</span>
                <span className="avatar">
                  {`${userDetails?.auth?.firstName.charAt(
                    0
                  )}${userDetails?.auth?.lastName.charAt(0)}`}
                  <span className="status online" />
                </span>
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="userSettings"
              >
                <div className="header-profile-actions">
                  <div className="header-user-profile">
                    <div className="header-user">
                      <img src={user} alt="Reatil Admin" />
                    </div>
                    <h5>{`${userDetails?.auth?.firstName} ${userDetails?.auth?.lastName}`}</h5>
                    <p>{userDetails?.roleType}</p>
                  </div>
                  <Link
                    to={`/${
                      userDetails?.roleType == "Admin"
                        ? "dashboard"
                        : "udashboard"
                    }/user-profile`}
                  >
                    <i>
                      <AiOutlineUser />
                    </i>{" "}
                    My Profile
                  </Link>
                  <Link
                    to={`/${
                      userDetails.roleType == "Admin"
                        ? "dashboard"
                        : "udashboard"
                    }/setting`}
                  >
                    <i>
                      <AiOutlineSetting />
                    </i>{" "}
                    Account Settings
                  </Link>
                  <Link to="/login" onClick={() => dispatch(signOut())}>
                    <i>
                      <FiLogOut />
                    </i>{" "}
                    Sign Out
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
