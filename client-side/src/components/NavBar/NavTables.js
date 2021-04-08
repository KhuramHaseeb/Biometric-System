import React from "react";

const NavTables = () => {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="tablesDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {/* <i className="icon-border_all nav-icon" /> */}
        Tables
      </a>
      <ul
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="tablesDropdown"
      >
        <li>
          <a className="dropdown-item" href="bs-tables.html">
            Bootstrap Tables
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="data-tables.html">
            Data Tables
          </a>
        </li>
        <li>
          <a
            className="dropdown-toggle sub-nav-link"
            href="#"
            id="submenuDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Submenu
          </a>
          <ul
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="submenuDropdown"
          >
            <li>
              <a className="dropdown-item" href="chat.html">
                Submenu 1
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="icons.html">
                Submenu 2
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  );
};

export default NavTables;
