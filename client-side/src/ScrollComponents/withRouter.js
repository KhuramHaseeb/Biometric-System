import { useLocation } from "react-router";

export function withRouter(Child) {
  return (props) => {
    const location = useLocation();
    return <Child {...props} location={location} />;
  };
}
