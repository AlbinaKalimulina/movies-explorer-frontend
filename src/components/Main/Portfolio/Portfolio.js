import React from "react";
import arrow from "../../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://github.com/AlbinaKalimulina/how-to-learn.git" target="_blank" className="portfolio__link">
            Статичный сайт
            <img className="portfolio__link" src={arrow} alt="Cтрелка" />
          </a>
        </li>

        <li className="portfolio__item">
          <a href="https://albinakalimulina.github.io/russian-travel/" target="_blank" className="portfolio__link">
            Адаптивный сайт
            <img className="portfolio__link" src={arrow} alt="Cтрелка" />
          </a>
        </li>

        <li className="portfolio__item">
          <a href="https://albinakalimulina.github.io/react-mesto-auth/" target="_blank" className="portfolio__link">
            Одностраничное приложение
            <img className="portfolio__link" src={arrow} alt="Cтрелка" />
          </a>
        </li>

      </ul>

    </section>
  )
}

export default Portfolio;