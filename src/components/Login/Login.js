import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Login({ onLogin, isLoading }) {

  const [userData, setUserData] = useState({
    email: {
      value: "",
      isValid: false,
      errorMessage: ""
    },
    password: {
      value: "",
      isValid: false,
      errorMessage: ""
    }
  });

  const isValid = userData.email.isValid && userData.password.isValid;

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    isLoading ? setDisabled(true) : setDisabled(false);
  }, [isLoading]);

  useEffect(() => {
    isValid ? setDisabled(false) : setDisabled(true);
  }, [isValid]);

  const handleChange = (evt) => {
    const { name, value, validity, validationMessage } = evt.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: {
        ...userData[name],
        value,
        isValid: validity.valid,
        errorMessage: validationMessage
      }
    }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin({
      email: userData.email.value,
      password: userData.password.value
    });
    setUserData({ email: '', password: '' });
  }

  return (
    <main className="main">
      <section className="login">

        <div className="login__header">
          <a href="/">
            <img src={logo} alt="Логотип" className="login__logo" />
          </a>
          <h1 className="login__title">Рады видеть!</h1>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>

          <label className="login__label" htmlFor="email">
            E-mail
          </label>

          <input
                    className={`login__input ${
                        userData.email.errorMessage && "login__input_error"
                    }`}
                    required
                    type="email"
                    name="email"
                    placeholder="email"
                    pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
                    value={userData.email.value || ""}
                    onChange={handleChange}
                />


          {/* <input
            required
            type="email"
            name="email"
            placeholder="email"
            className="login__input"
          /> */}
          {/* <span className="login__error"></span> */}

          <span className="login__error">
                    {userData.email.errorMessage}
                </span>

          <label className="login__label" htmlFor="password">
            Пароль
          </label>

          <input
                    className={`login__input ${
                        userData.password.errorMessage && "login__input_error"
                    }`}
                    required
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    minLength={6}
                    maxLength={20}
                    value={userData.password.value || ""}
                    onChange={handleChange}
                />

          {/* <input
            required
            type="password"
            name="password"
            placeholder="Пароль"
            minLength={6}
            maxLength={20}
            className="login__input"
          /> */}
          {/* <span className="login__error"></span> */}

          <span className="login__error">
                    {userData.password.errorMessage}
                </span>

          {/* <button className="login__button" type="submit">Войти</button> */}

          <button
                    className={`login__button ${
                        isValid && !isLoading ? "" : "login__button_disabled"
                    }`}
                    type="submit"
                    disabled={disabled}
                >
                    Войти
                </button>

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