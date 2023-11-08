import React from "react";

function NavTab() {
  return (
    <nav className="panel">
      <ul className="panel__links">
        <li className="panel__item">
          <a className="panel__link" href="#about-project">О проекте</a>
        </li>
        <li className="panel__item">
          <a className="panel__link" href="#techs">Технологии</a>
        </li>
        <li className="panel__item">
          <a className="panel__link" href="#student">Студент</a>
        </li>
      </ul>
    </nav>
  )
}

export default NavTab;