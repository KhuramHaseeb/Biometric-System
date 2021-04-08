import React from "react";

const PageHeaderFile = (props) => {
  // console.log(props)
  return (
    <div className="page-title">
      <div className="row gutters">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <h4 className="title">{props.title}</h4>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="daterange-container">
            <div className="date-range">
              <div id="reportrange">{props.link1}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeaderFile;
