import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://github.com/AlbinaKalimulina/how-to-learn.git" target="_blank" rel="noreferrer" className="portfolio__link">
            Статичный сайт
            <p className="portfolio__link-arrow">&#8599;</p>
          </a>
        </li>

        <li className="portfolio__item">
          <a href="https://albinakalimulina.github.io/russian-travel/" target="_blank" rel="noreferrer" className="portfolio__link">
            Адаптивный сайт
            <p className="portfolio__link-arrow">&#8599;</p>
          </a>
        </li>

        <li className="portfolio__item">
          <a href="https://albinakalimulina.github.io/react-mesto-auth/" target="_blank" rel="noreferrer" className="portfolio__link">
            Одностраничное приложение
            <p className="portfolio__link-arrow">&#8599;</p>
          </a>
        </li>

      </ul>

    </section>
  )
}

export default Portfolio;