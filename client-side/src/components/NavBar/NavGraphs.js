import React from "react";
import { FiPieChart } from "react-icons/fi";

const NavGraphs = () => {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="graphsDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {/* <i className="nav-icon">
          <FiPieChart />
        </i> */}
        Graphs
      </a>
      <ul
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="graphsDropdown"
      >
        <li>
          <a className="dropdown-item" href="area-graphs.html">
            Area Charts
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="bar-graphs.html">
            Bar Charts
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="column-graphs.html">
            Column Charts
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="donut-graphs.html">
            Donut Charts
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="line-graphs.html">
            Line Charts
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="mixed-graphs.html">
            Mixed Charts
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="pie-graphs.html">
            Pie Charts
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="vector-maps.html">
            Vector Maps
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="google-maps.html">
            Google Maps
          </a>
        </li>
      </ul>
    </li>
  );
};

export default NavGraphs;
