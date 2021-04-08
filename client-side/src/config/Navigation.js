import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import E404 from "../components/Error/E404";
import E505 from "../components/Error/E505";
import Login from "../components/Login";

import ForgotPass from "../components/ForgotPass";
import { toast } from "react-toastify";
import Home from "../components/Dashboard/Home";
import ResetPass from "../components/ResetPass";

import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import jwt_decode from "jwt-decode";
import { userLoginDetails, loggedIn } from "../store/action/action";
import axios from "axios";
import url from "../url.json";
import UserDashboard from "../components/UserDashboard";

toast.configure();
const Navigation = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => {
    return state.root.isLogin;
  });
  const userDetails = useSelector((state) => state.root.userDetails);
  console.log("USERDETAILS", userDetails);
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token").length > 0
    ) {
      dispatch(loggedIn(true));
      var token = localStorage.getItem("token");
      var decode = jwt_decode(token);
      console.log(decode);
      axios
        .get(`${url.constant}/getConstant_typeId`, {
          params: { typeId: 1 },
        })
        .then(async (d) => {
          await d.data.data?.map(({ name, constantId }, i) => {
            if (decode.roleType === constantId) {
              console.log("RoleType", name);
              dispatch(userLoginDetails({ auth: decode, roleType: name }));
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(loggedIn(false));
    }
  }, []);

  return (
    <Routes>
      <PrivateRoute
        isAuth={isLogin}
        path="/"
        component={Home}
        redirectTo="/login"
      />
      {isLogin &&
      Object.keys(userDetails).length === 0 &&
      localStorage.getItem("token") &&
      localStorage.getItem("token").length > 0 &&
      userDetails?.roleType ? null : isLogin &&
        userDetails?.roleType == "Admin" ? (
        <PrivateRoute
          isAuth={isLogin}
          path="dashboard/*"
          component={Dashboard}
          redirectTo="/login"
        />
      ) : userDetails?.roleType ? (
        <PrivateRoute
          isAuth={isLogin}
          path="udashboard/*"
          component={UserDashboard}
          redirectTo="/login"
        />
      ) : null}

      <PrivateRoute
        isAuth={!isLogin}
        path="login"
        component={Login}
        redirectTo="/"
      />

      <PrivateRoute
        isAuth={!isLogin}
        path="forgot-pwd"
        component={ForgotPass}
        redirectTo="/"
      />
      <PrivateRoute
        isAuth={!isLogin}
        path="reset-pwd/:token"
        component={ResetPass}
        redirectTo="/"
      />
      <PrivateRoute
        isAuth={!isLogin}
        path="login"
        component={Login}
        redirectTo="/"
      />

      <PrivateRoute
        isAuth={!isLogin}
        path="forgot-pwd"
        component={ForgotPass}
        redirectTo="/"
      />
      <PrivateRoute
        isAuth={!isLogin}
        path="reset-pwd/:token"
        component={ResetPass}
        redirectTo="/"
      />
      <Route path="*" element={<E404 />} />
      <Route path="e505" element={<E505 />} />
    </Routes>
  );
};

export default Navigation;
