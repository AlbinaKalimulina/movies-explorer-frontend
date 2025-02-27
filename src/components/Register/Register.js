import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Register({ onRegister, isLoading }) {

  const [userData, setUserData] = useState({
    name: {
      value: "",
      isValid: false,
      errorMessage: ""
    },
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

  const isValid =
    userData.name.isValid &&
    userData.email.isValid &&
    userData.password.isValid;

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
    onRegister({
      name: userData.name.value,
      email: userData.email.value,
      password: userData.password.value
    });
  }

  return (
    <main className="main">
      <section className="register">
        <div className="register__header">
          <Link to="/">
            <img src={logo} alt="Логотип" className="register__logo" />
          </Link>

          <h1 className="register__title">Добро пожаловать!</h1>
        </div>

        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__label">Имя</label>

          <input
            className={`register__input ${userData.name.errorMessage && "register__input_error"
              }`}
            required
            type="text"
            name="name"
            placeholder="Введите имя"
            pattern="^[а-яё]+(?:[ -]{1}[а-яё]*)?$"
            minLength={2}
            maxLength={20}
            value={userData.name.value || ""}
            onChange={handleChange}
          />

          <span className="register__error">
            {userData.name.errorMessage}
          </span>


          <label className="register__label">E-mail</label>

          <input
            className={`register__input ${userData.email.errorMessage && "register__input_error"
              }`}
            required
            type="email"
            name="email"
            placeholder="Введите e-mail"
            pattern={"^\\S+@\\S+\\.\\S+$"}
            value={userData.email.value || ""}
            onChange={handleChange}
          />

          <span className="register__error">
            {userData.email.errorMessage}
          </span>

          <label className="register__label">Пароль</label>

          <input
            className={`register__input ${userData.password.errorMessage && "register__input_error"
              }`}
            required
            type="password"
            name="password"
            placeholder="Введите пароль"
            minLength={6}
            maxLength={20}
            value={userData.password.value || ""}
            onChange={handleChange}
          />

          <span className="register__error">
            {userData.password.errorMessage}
          </span>

          <button
            className={`register__button ${isValid && !isLoading ? "" : "register__button_disabled"
              }`}
            type="submit"
            disabled={disabled}
          >
            Зарегистрироваться
          </button>

        </form>

        <div className="register__bottom">
          <span>Уже зарегистрированы?</span>
          <Link to="/signin" className="register__link">Войти</Link>
        </div>

      </section>
    </main>
  );
};

export default Register;