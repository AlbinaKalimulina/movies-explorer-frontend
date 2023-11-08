import React from "react";
import logo from "../../images/logo.svg";

const Login = () => {
  return (
    <main className="main">
      <section className="login">

        <div className="login__header">
          <a href="/">
            <img src={logo} alt="Логотип" className="login__logo" />
          </a>
          <h1 className="login__title">Рады видеть!</h1>
        </div>

        <form className="login__form">

          <label className="login__label" htmlFor="email">
            E-mail
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="email"
            className="login__input"
          />
          <span className="login__error"></span>

          <label className="login__label" htmlFor="password">
            Пароль
          </label>
          <input
            required
            type="password"
            name="password"
            placeholder="Пароль"
            minLength={6}
            maxLength={20}
            className="login__input"
          />
          <span className="login__error"></span>

          <button className="login__button" type="submit">Войти</button>

        </form>

        <div className="login__bottom">
          <span>Ещё не зарегистрированы?</span>
          <a href="signup" className="login__link">Регистрация</a>
        </div>

      </section>
    </main>
  );
};

export default Login;