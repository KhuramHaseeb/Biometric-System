import React from "react";
import NavBar from "../NavBar";
import HeaderBar from "./HeaderBar";

const Header = () => {
  return (
    <React.Fragment>
      <HeaderBar />
      <NavBar />
    </React.Fragment>
  );
};

export default Header;
