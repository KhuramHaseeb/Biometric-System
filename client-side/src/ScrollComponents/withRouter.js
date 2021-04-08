// import React from 'react'

import { useLocation } from "react-router";

export function withRouter(Child) {
  return (props) => {
    const location = useLocation();
    //   const navigate = useNavigate();
    return <Child {...props} location={location} />;
  };
}
