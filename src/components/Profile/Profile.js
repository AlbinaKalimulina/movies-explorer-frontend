import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Profile({ onUpdateUser, isLoading, onSignout }) {

  const currentUser = useContext(CurrentUserContext);

  const [userData, setUserData] = useState({
    name: {
      value: "",
      isValid: true,
      errorMessage: ""
    },
    email: {
      value: "",
      isValid: true,
      errorMessage: ""
    }
  });

  const isValid = userData.name.isValid && userData.email.isValid;

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    isLoading ? setDisabled(true) : setDisabled(false);
  }, [isLoading]);

  useEffect(() => {
    isValid === true ? setDisabled(false) : setDisabled(true);
  }, [isValid]);

  useEffect(() => {
    if (
      currentUser.name === userData.name.value &&
      currentUser.email === userData.email.value
    ) {
      setDisabled(true);
    } else if (isValid) {
      setDisabled(false);
    } else if (!isValid) {
      setDisabled(true);
    }
  }, [currentUser, userData, isValid]);

  useEffect(() => {
    setUserData({
      name: {
        value: currentUser.name,
        isValid: true,
        errorMessage: ""
      },
      email: {
        value: currentUser.email,
        isValid: true,
        errorMessage: ""
      }
    });
  }, [currentUser]);

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
    onUpdateUser({
      name: userData.name.value,
      email: userData.email.value
    });
  }

  return (

    <main className="main">
      <section className="profile">

        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>

        <form className="profile__container" onSubmit={handleSubmit} noValidate>

          <label className="profile__info">

            <span className="profile__text">Имя</span>

            <input
              required
              type="text"
              name="name"
              placeholder="Введите имя"
              pattern="^[A-Za-zА-Яа-яЁё\\-\\s]+$"
              minLength={2}
              maxLength={20}
              className="profile__input"
              value={userData.name.value || ""}
              onChange={handleChange}
            />

          </label>

          <span className="profile__span-error">
            {userData.name.errorMessage}
          </span>

          <label className="profile__info">
            <span className="profile__text">E-mail</span>
            <input
              required
              type="email"
              name="email"
              placeholder="Введите e-mail"
              className="profile__input"
              pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
              value={userData.email.value || ""}
              onChange={handleChange}
            />
          </label>

          <span className="profile__span-error">
            {userData.email.errorMessage}
          </span>

          <button
            className={`profile__edit-button ${isValid && !isLoading ? "" : "profile__edit-button_disabled"
              }`}
            type="submit"
            disabled={disabled}
          >
            Редактировать
          </button>

          <Link className="profile__signout-link" to="/" onClick={onSignout}>Выйти из аккаунта</Link>

        </form>
      </section>
    </main>

  );
}

export default Profile;