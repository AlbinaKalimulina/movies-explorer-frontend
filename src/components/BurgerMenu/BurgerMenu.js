import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function BurgerMenu({ onClose }) {

  const { pathname } = useLocation();

  return (
    <div className="menu">
      <div className="burger__menu">
        <div className="menu__container">

          <button
            type="button"
            className="menu__close-button"
            onClick={() => onClose()}
          />

          <nav>
            <div className="menu__list">

              <div>
                <NavLink
                  exact
                  to="/"
                  className={pathname === "/" ? "menu-link_active" : "menu-link"}
                >
                  Главная
                </NavLink>
              </div>

              <div>
                <NavLink
                  to="/movies"
                  className={pathname === "/movies" ? "menu-link_active" : "menu-link"}
                >
                  Фильмы
                </NavLink>
              </div>

              <div>
                <NavLink
                  to="/saved-movies"
                  className={pathname === "/saved-movies" ? "menu-link_active" : "menu-link"}
                >
                  Сохранённые фильмы
                </NavLink>
              </div>

            </div>
          </nav>

          <Link to="/profile">
              <button className="menu__account_button" type="button">Аккаунт</button>
              <button className="account__logo" />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;