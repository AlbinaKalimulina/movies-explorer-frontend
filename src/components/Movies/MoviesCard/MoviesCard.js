import React from "react";
import { Link } from "react-router-dom";
import moviePoster from "../../../images/movie.png";

function MoviesCard() {
  return (
    <li className="card">
      <img className="card__image" src={moviePoster} alt="Постер фильма" />

      <div className="card__info">
        <h2 className="card__container-title">33 слова о дизайне</h2>
        <p className="card__container-duration">1ч 17м</p>
      </div>

      <div className="card__button">
        <Link to="/movies">
          <button className="card__save-button" type="button">Сохранить</button>
        </Link>

        <Link to="/movies">
          <button className="card__saved-button" type="button"></button>
        </Link>

        <Link to="/saved-movies">
          <button className="card__delete-button" type="button"></button>
        </Link>

      </div>
    </li>
  );
}

export default MoviesCard;