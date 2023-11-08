import React from "react";
import { useLocation, Link } from "react-router-dom";

import Navigation from '../Navigation/Navigation.js';
import logo from '../../images/logo.svg';

const Header = ({ loggedIn }) => {
  const { pathname } = useLocation();

  return (
    <header className={pathname === "/" ? "header header_violet" : "header"}>
      <div className="header__links-container">
        <Link to="/">
          <img src={logo} alt="Логотип" className="header__logo" />
        </Link>
        <Navigation loggedIn={loggedIn} className="header header_violet" />
      </div>
    </header>
  );
};

export default Header;