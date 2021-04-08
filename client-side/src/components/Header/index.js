import React from "react";
import NavBar from "../NavBar";
import HeaderBar from "./HeaderBar";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <React.Fragment>
      <HeaderBar />
      <NavBar />
      {/* <SearchBar /> */}
    </React.Fragment>
  );
};

export default Header;
