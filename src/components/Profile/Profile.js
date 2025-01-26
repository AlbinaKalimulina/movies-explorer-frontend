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

  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const isValid = userData.name.isValid && userData.email.isValid;

  // отслеживание изменений данных пользователя
  useEffect(() => {
    setIsDataChanged(
      currentUser.name !== userData.name.value ||
      currentUser.email !== userData.email.value
    );
  }, [currentUser, userData]);

  // управление состоянием disabled и отслеживание валидности данных
  useEffect(() => {
    isLoading ? setDisabled(true) : setDisabled(false);
  }, [isLoading]);

  useEffect(() => {
    isValid === true ? setDisabled(false) : setDisabled(true);
  }, [isValid]);

  // проверка на изменение данных пользователя и их валидность
  useEffect(() => {
    if (
      currentUser.name === userData.name.value &&
      currentUser.email === userData.email.value
    ) {
      setDisabled(true); // деактивация кнопки при совпадении данных
    } else if (isValid) {
      setDisabled(false); // восстановление активности кнопки при изменении данных и валидности
    } else if (!isValid) {
      setDisabled(true); // деактивация кнопки при невалидных данных
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
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name: userData.name.value,
      email: userData.email.value
    });
    setIsProfileSaved(true);
    setIsDataChanged(false);
  };

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
              pattern="^[а-яё]+(?:[ -]{1}[а-яё]*)?$"
              minLength={2}
              maxLength={20}
              className="profile__input"
              value={userData.name.value || ""}
              onChange={handleChange}
            />
          </label>
          <span className="profile__span-error">{userData.name.errorMessage}</span>
          <label className="profile__info">
            <span className="profile__text">E-mail</span>
            <input
              required
              type="email"
              name="email"
              placeholder="Введите e-mail"
              className="profile__input"
              pattern={"^\\S+@\\S+\\.\\S+$"}
              value={userData.email.value || ""}
              onChange={handleChange}
            />
          </label>
          <span className="profile__span-error">{userData.email.errorMessage}</span>
          <div className="profile__submit-container">
            {isProfileSaved && (
              <span className="profile__success-message">
                Профиль успешно обновлен!
              </span>
            )}
            <button
              className={`profile__edit-button ${isValid && !isLoading && isDataChanged ? "" : "profile__edit-button_disabled"
                }`}
              type="submit"
              disabled={!isValid || isLoading || !isDataChanged}
            >
              Редактировать
            </button>
          </div>
          <Link className="profile__signout-link" to="/" onClick={onSignout}>
            Выйти из аккаунта
          </Link>
        </form>
      </section>
    </main>
  );
}

export default Profile;