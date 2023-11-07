import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu.js";

function Navigation({ loggedIn }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const location = useLocation().pathname;
  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <nav className="nav">
      {loggedIn ? (
        <>
          <div className="nav__movies">
            <div>
              <Link
                to="/movies"
                className={
                  location === "/movies"
                    ? "nav__movies-link nav__movies-link_active"
                    : "nav__movies-link"
                }
              >
                Фильмы
              </Link>
            </div>
            <div>
              <Link
                to="/saved-movies"
                className={
                  location === "/saved-movies"
                    ? "nav__movies-link nav__movies-link_active"
                    : "nav__movies-link"
                }
              >
                Сохранённые фильмы
              </Link>
            </div>

          </div>
          <div>
            <div className="nav__account">
              <Link to="/profile" className="nav__button-account">
                Аккаунт
              </Link>
              <button className="nav__account-icon" />
            </div>
          </div>
        </>
      ) : (
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
      )}
      {loggedIn &&
        (!isBurgerMenuOpen ? (
          <div className="burger">
            <button
              className="burger__button"
              onClick={toggleBurgerMenu}
              type="button"
            />
          </div>
        ) : (
          <BurgerMenu onClose={toggleBurgerMenu} />
        ))}
    </nav>
  );
};

export default Navigation;