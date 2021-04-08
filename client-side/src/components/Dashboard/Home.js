import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import { userLogin } from "../../store/action/action";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isLogin = useSelector((state) => {
  //   // console.log("State",state);
  //   return state.root.isLogin;
  // });

  const isLogin = useSelector((state) => state.root.isLogin);
  const userDetails = useSelector((state) => state.root.userDetails);
  console.log(isLogin);
  // var login = true;
  useEffect(() => {
    (() => {
      // setTimeout(() => {
      
      isLogin
        ? userDetails?.roleType === "Admin"
          ? navigate("/dashboard")
          : navigate("/udashboard")
        : navigate("/login");
      console.log("Home");
      // }, 1000);
    })();
  }, []);

  //   return <div>Loading . . .</div>;

  return (
    <div id="loading-wrapper">
      <div className="spinner-border text-apex-green" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Home;
