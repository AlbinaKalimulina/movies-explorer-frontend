import { Link } from "react-router-dom";

function Profile() {
  return (
    <>
      <section className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>

        <form className="profile__container">

          <label className="profile__info">
            <span className="profile__text">Имя</span>
            <input
              required
              type="text"
              name="name"
              placeholder="Виталий"
              minLength="2"
              maxLength="20"
              className="profile__input"
            />
          </label>

          <label className="profile__info">
            <span className="profile__text">E-mail</span>
            <input
              required
              type="email"
              name="email"
              placeholder="pochta@yandex.ru"
              className="profile__input"
            />
          </label>

          <button
            className="profile__edit-button"
            type="button">
            Редактировать
          </button>

          <Link className="profile__signout-link" to="/">Выйти из аккаунта</Link>

        </form>
      </section>
    </>
  );
}

export default Profile;