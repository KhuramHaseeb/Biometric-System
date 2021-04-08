import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.root.isLogin);
  const userDetails = useSelector((state) => state.root.userDetails);

  useEffect(() => {
    (() => {
      isLogin
        ? userDetails?.roleType === "Admin"
          ? navigate("/dashboard")
          : navigate("/udashboard")
        : navigate("/login");
      console.log("Home");
    })();
  }, []);

  return (
    <div id="loading-wrapper">
      <div className="spinner-border text-apex-green" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Home;
