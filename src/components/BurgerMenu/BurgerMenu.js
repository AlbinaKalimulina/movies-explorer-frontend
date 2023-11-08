import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function BurgerMenu({ onClose }) {

  const { pathname } = useLocation();

  return (
    <div className="menu">
      <div className="menu__burger">
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
                  className={pathname === "/" ? "menu__link_active" : "menu__link"}
                >
                  Главная
                </NavLink>
              </div>

              <div>
                <NavLink
                  to="/movies"
                  className={pathname === "/movies" ? "menu__link_active" : "menu__link"}
                >
                  Фильмы
                </NavLink>
              </div>

              <div>
                <NavLink
                  to="/saved-movies"
                  className={pathname === "/saved-movies" ? "menu__link_active" : "menu__link"}
                >
                  Сохранённые фильмы
                </NavLink>
              </div>

            </div>
          </nav>

          <Link to="/profile" className="menu__account-link">
            <button className="menu__account-link-button" type="button">Аккаунт</button>
            <button className="menu__account-link-logo" />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;