import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";


function MoviesCard({ movie, savedMovies, onLikeMovie, onDeleteMovie }) {

  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isLikeButton = location.pathname === '/movies';
  const savedMovie = savedMovies
    ? savedMovies.find((item) => item.movieId === movie.id)
    : '';
  const isLiked = savedMovies
    ? savedMovies.some((i) => i.movieId === movie.id)
    : false;
  const isDeleteButton = location.pathname === '/saved-movies';
  const imageUrl = movie.image.url
    ? `${'https://api.nomoreparties.co'}${movie.image.url}`
    : movie.image;
  const normalizedDuration = useMemo(() => {
    const minutes = movie.duration % 60;
    const hours = (movie.duration - minutes) / 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }, [movie.duration]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

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
            onClick={() => onLikeMovie(movie, isLiked, savedMovie?._id)}
            className={`moviescard__like-btn ${isLiked ? ' moviescard__like-btn_liked' : ''}`}
            style={{ display: isHovered || window.innerWidth <= 767 ? 'block' : 'none' }}
          />
        )}
        {isDeleteButton && (
          <button
            onClick={() => onDeleteMovie(movie._id)}
            className={`moviescard__delete-btn`}
            style={{ display: isHovered || window.innerWidth <= 767 ? 'block' : 'none' }}
          />
        )}

      </div>


      {/* <div className="card__button">
        <Link to="/movies">
          <button className="card__save-button" type="button">Сохранить</button>
        </Link>

        <Link to="/movies">
          <button className="card__saved-button" type="button"></button>
        </Link>

        <Link to="/saved-movies">
          <button className="card__delete-button" type="button"></button>
        </Link>

      </div> */}

    </li>
  );

}

export default MoviesCard;