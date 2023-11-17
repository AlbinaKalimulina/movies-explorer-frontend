import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, savedMovies, onSaveMovie, onDeleteMovie }) {

  const [isHovered, setIsHovered] = useState(false); // отслеживает состояние наведения мыши на карточку фильма

  const location = useLocation();

  const isLikeButton = location.pathname === '/movies';

  // Ищет сохраненный фильм в списке сохраненных фильмов
  const savedMovie = savedMovies
    ? savedMovies.find((item) => item.movieId === movie.id)
    : '';

  // проверяет, есть ли текущий фильм в списке сохраненных фильмов
  const isLiked = savedMovies
    ? savedMovies.some((item) => item.movieId === movie.id)
    : false;

  const isDeleteButton = location.pathname === '/saved-movies';

  const imageUrl = movie.image.url
    ? `${'https://api.nomoreparties.co'}${movie.image.url}`
    : movie.image;

  // расчет продолжительности фильма
  const normalizedDuration = useMemo(() => {
    const minutes = movie.duration % 60;
    const hours = (movie.duration - minutes) / 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }, [movie.duration]);

  // Обработчик события наведения мыши на карточку фильма
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Обработчик события ухода мыши с карточки фильма
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img className="card__image" src={imageUrl} alt={movie.nameRU} />
      </a>

      <div className="card__info">
        <p className="card__title">{movie.nameRU}</p>
        <p className="card__duration">{normalizedDuration}</p>

        {isLikeButton && (
          <button
            onClick={() => onSaveMovie(movie, isLiked, savedMovie?._id)}
            className={`card__like-button ${isLiked ? 'card__like-button_liked' : ''}`}
            style={{ display: isHovered || window.innerWidth <= 767 ? 'block' : 'none' }}
          />
        )}

        {isDeleteButton && (
          <button
            onClick={() => onDeleteMovie(movie._id)}
            className={`card__delete-button`}
            style={{ display: isHovered || window.innerWidth <= 767 ? 'block' : 'none' }}
          />
        )}

      </div>
    </li>
  );
}

export default MoviesCard;