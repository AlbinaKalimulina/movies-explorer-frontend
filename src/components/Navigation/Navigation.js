import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu.js";

function Navigation({ loggedIn }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const { pathname } = useLocation();

  console.log("loggedIn", loggedIn)

  return (
    <nav className="nav">
      {loggedIn ? (
        <>
          <div
            className={pathname === '/' ? "nav__movies" : "nav__movies"}
          >

            <Link
              exact="true"
              to="/movies"
              className={pathname === "/movies" ? "nav__movies-link nav__movies-link_active" : "nav__movies-link"}
            >
              Фильмы
            </Link>


            <Link
              to="/saved-movies"
              className={pathname === "/saved-movies" ? "nav__movies-link nav__movies-link_active" : "nav__movies-link"}
            >
              Сохранённые фильмы
            </Link>

          </div>


          <div className="nav__account">
            <Link to="/profile" className="nav__account-button">
              Аккаунт
            </Link>
            <button
              className={pathname === '/' ? 'nav__account-icon nav__account-icon-black' : 'nav__account-icon'}
              type="button"
            />
          </div>

          {!isBurgerMenuOpen ? (
            <div className="burger">

              <button
                className={pathname === '/' ? 'burger__button' : 'burger__button'}
                onClick={toggleBurgerMenu}
                type="button"
              />

            </div>
          ) : (
            <BurgerMenu onClose={toggleBurgerMenu} />
          )}
        </>
      ) : (
        <>
          <div className="nav__auth">
            <div>
              <Link to="/signup" className="nav__link">
                Регистрация
              </Link>
            </div>
            <div>
              <Link to="/signin" className="nav__button">
                Войти
              </Link>
            </div>
          </div>
        </>
      )}

    </nav>
  );
};

export default Navigation;