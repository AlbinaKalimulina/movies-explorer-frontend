import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

const Register = () => {
  return (
    <section className="register">
      <div className="register__header">
        <Link to="/">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>

        <h1 className="register__title">Добро пожаловать!</h1>
      </div>

      <form className="register__form">
        <label className="register__label">Имя</label>

        <input
          required
          type="text"
          name="name"
          placeholder="Виталий"
          minLength={2}
          maxLength={20}
          className="register__input"
        />
        <div className="register__error"></div>

        <label className="register__label">E-mail</label>
        <input
          required
          type="email"
          name="email"
          placeholder="pochta@yandex.ru"
          pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
          className="register__input"
        />
        <div className="register__error"></div>

        <label className="register__label">Пароль</label>
        <input
          required
          type="password"
          name="password"
          placeholder="Пароль"
          minLength={6}
          maxLength={20}
          className="register__input_password"
        />
        <div className="register__error">Что-то пошло не так...</div>

        <button className="register__button" type="submit">Зарегистрироваться</button>

      </form>

      <div className="register__bottom">
        <span>Уже зарегистрированы?</span>
        <Link to="/signin" className="register__link">Войти</Link>
      </div>

    </section>
  );
};

export default Register;