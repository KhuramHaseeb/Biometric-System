import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="search-container">
      <div className="row justify-content-center">
        <div className="col-xl-5 col-lg-6 col-md-7 col-sm-8 col-12">
          <div className="search-box">
            <input
              type="text"
              className="search-query"
              placeholder="Search here ..."
            />
            <i>
              <FiSearch style={{ verticalAlign: "inherit" }} />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
