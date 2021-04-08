import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  redirectTo,
  isAuth,
  path,
  ...props
}) => {
  if (isAuth) {
    return <Route path={path} element={<Component />} />;
  }
  return <Navigate to={redirectTo} />;
};

export default PrivateRoute;
