import MoviesCard from "../MoviesCard/MoviesCard.js";
import useScreenResize from '../../../hooks/useScreenResize.js';
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCardList({ movies, savedMovies, onSaveMovie, onDeleteMovie, isSavedMoviesPage }) {

  let screenSize = useScreenResize();

  const [additionalMoviesToAdd, setAdditionalMoviesToAdd] = useState(0);
  const location = useLocation();

  // сброс количества добавленных фильмов при изменении списка фильмов
  useEffect(() => {
    setAdditionalMoviesToAdd(0);
  }, [movies]);

  // расчет списка фильмов для отображения с учетом размера экрана и текущей страницы
  const displayedMovies = useMemo(() => {
    if (isSavedMoviesPage) {
      return movies;
    }

    // определяет количество фильмов для отображения в зависимости от размера экрана
    let countToDisplay = 12;

    if (screenSize.width < 1240) {
      countToDisplay = 8;
    }

    if (screenSize.width < 768) {
      countToDisplay = 5;
    }

    return movies.slice(0, countToDisplay + additionalMoviesToAdd);
  }, [movies, additionalMoviesToAdd, screenSize, isSavedMoviesPage]);


  return (
    <section className="card-list">
      <ul className="card-list__container">

        {displayedMovies.map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              savedMovies={savedMovies}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
            />
          );
        })}
      </ul>

      {location.pathname === '/movies' &&
        movies.length > displayedMovies.length && (
          <button
            onClick={() => {

              // увеличение количества добавляемых фильмов в зависимости от размера экрана
              setAdditionalMoviesToAdd((prev) => prev + (screenSize.width >= 1241 ? 3 : 2));
            }}
            className="card-list__button"
          >
            Еще
          </button>
        )}
    </section>
  );
};

export default MoviesCardList;