import React from "react";

const NavUIElements = () => {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="uiElementsDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {/* <i className="icon-camera2 nav-icon" /> */}
        UI Elements
      </a>
      <ul
        className="dropdown-menu dropdown-menu-right mega-menu-lg"
        aria-labelledby="uiElementsDropdown"
      >
        <li>
          <a className="dropdown-item" href="accordion.html">
            Accordions
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="breadcrumbs.html">
            Breadcrumbs
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="buttons.html">
            Buttons
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="button-groups.html">
            Button Groups
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="cards.html">
            Cards
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="carousel.html">
            Carousels
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="dropdowns.html">
            Dropdowns
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="icons.html">
            Icons
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="jumbotron.html">
            Jumbotron
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="labels-badges.html">
            Labels &amp; Badges
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="list-items.html">
            List Items
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="modals.html">
            Modals
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="nav.html">
            Nav
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="navbars.html">
            Navbars
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="notifications.html">
            Notifications
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="pagination.html">
            Paginations
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="progress.html">
            Progress Bars
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="pills.html">
            Pills
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="spinners.html">
            Spinners
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="tabs.html">
            Tabs
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="popovers-tooltips.html">
            Tooltips
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="toasts.html">
            Toasts
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="typography.html">
            Typography
          </a>
        </li>
      </ul>
    </li>
  );
};

export default NavUIElements;
