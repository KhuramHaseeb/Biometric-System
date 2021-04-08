import React, { useEffect } from "react";
import { Routes, Route, } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import E404 from "../components/Error/E404";
import E505 from "../components/Error/E505";
import Login from "../components/Login";

import ForgotPass from "../components/ForgotPass";

import Home from "../components/Dashboard/Home";
import ResetPass from "../components/ResetPass";

import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
// import { isAuthenticated } from "./index";
import jwt_decode from "jwt-decode";
import { userLoginDetails, loggedIn } from "../store/action/action";
import axios from "axios";
import url from "../url.json";
import UserDashboard from "../components/UserDashboard";

const Navigation = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => {
    // console.log("State",state);
    return state.root.isLogin;
  });
  const userDetails = useSelector((state) => state.root.userDetails);
  console.log("USERDETAILS", userDetails);
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token").length > 0
    ) {
      // var indicate = localStorage.setItem("token", );
      // dispatch()
      var token = localStorage.getItem("token");
      var decode = jwt_decode(token);
      console.log(decode);
      axios
        .get(`${url.constant}/getConstant_typeId`, {
          params: { typeId: 1 },
        })
        .then(async (d) => {
          await d.data.data?.map(({ name, id }, i) => {
            if (decode.roleType === id) {
              console.log("RoleType", name);
              dispatch(userLoginDetails({ auth: decode, roleType: name }));
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogin]);


  if (
    localStorage.getItem("token") &&
    localStorage.getItem("token").length > 0
  ) {
    // var token = localStorage.getItem("token");
    // var decode = jwt_decode(token);
    // console.log(decode);
    // axios
    //   .get(`${url.constant}/getConstant_typeId`, {
    //     params: { typeId: 1 },
    //   })
    //   .then(async(d) => {
    //     await d.data.data?.map(({ name, id }, i) => {
    //       if (decode.roleType === id) {
    //         console.log("RoleType",name);
    //         dispatch(userLoginDetails({ auth: decode, roleType: name }));
    //       }
    //     });
    //     return true;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return false;
    //   });
    console.log(true);
    dispatch(loggedIn(true));
    // return true;
  } else {
    console.log(false);
    dispatch(loggedIn(false));
    // return false;
  }
  // };
  // console.log(auth());
  return (
    <Routes>

      <PrivateRoute
        isAuth={isLogin}
        path="/"
        component={Home}
        redirectTo="/login"
      
      />
      {userDetails?.roleType === "Admin" ? (
        <PrivateRoute
          isAuth={isLogin}
          path="dashboard/*"
          component={Dashboard}
          redirectTo="/login"
        />
      ) : (
        <PrivateRoute
          isAuth={isLogin}
          path="udashboard/*"
          component={UserDashboard}
          redirectTo="/login"
        />
      )}
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
      {/* <Route path="signup" element={<Signup />} /> */}
      {/* <Route path="forgot-pwd" element={<ForgotPass />} />
      <Route path="reset-pwd/:token" element={<ResetPass />} /> */}

      {/* <Route path="/user-profile" element={<NavBar />} /> */}

      {/* <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} >
            <Route path='/' element={<AllProducts />} />
            <Route path=':id' element={<ProductDetails />} />
        </Route> */}
      <Route path="*" element={<E404 />} />
      <Route path="e505" element={<E505 />} />
    </Routes>
  );
};

export default Navigation;
