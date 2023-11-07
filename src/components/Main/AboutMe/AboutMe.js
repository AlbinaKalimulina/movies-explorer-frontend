import React from "react";
import ProfilePhoto from '../../../images/profile-photo.png'

function AboutMe() {
  return (
    <section className="me">
      <h2 className="me__title" id="student">Студент</h2>
      <div className="me__container">
        <div className="me__info">
          <h3 className="me__name">Виталий</h3>
          <p className="me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="me__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a href="https://github.com/AlbinaKalimulina" className="me__contact-link" target="blank">Github</a>
        </div>
        <img className="me__photo" alt="Фото профиля" src={ProfilePhoto} />
      </div>
    </section>
  )
}

export default AboutMe;
