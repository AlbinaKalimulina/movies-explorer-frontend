import React, { useEffect, useState } from "react";
import MoviesCardList from "./MoviesCardList/MoviesCardList.js";
import SearchForm from "./SearchForm/SearchForm.js";
import Preloader from "./Preloader/Preloader.js";

import moviesApi from '../../utils/MoviesApi';

function Movies({ savedMovies, onSaveMovie }) {
  const [filteredMovies, setFilteredMovies] = useState([]); // массив отфильтрованных фильмов
  const searchedMovies = localStorage.getItem('searchedMovies'); // данные о поисковом запросе из локального хранилища
  const queries = localStorage.getItem('searchQueryMovies'); // данные об отфильтрованных фильмах из локального хранилища
  const [searchQuery, setSearchQuery] = useState({}); // состояние текущего поискового запроса
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки данных

  // Функция для фильтрации фильмов
  const filterMovies = (query) => {
    setIsLoading(true);

    moviesApi.getMovies().then((movies) => {

      let filtered = [];
      localStorage.setItem('searchQueryMovies', JSON.stringify(query));

      if (query.isShortFilmChecked) {
        filtered = movies.filter((m) => {
          return (
            m.duration <= 40 && m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase())
          );
        });
      } else {
        filtered = movies.filter((m) => {
          return m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase());
        });
      }
      setFilteredMovies(filtered);
      localStorage.setItem('searchedMovies', JSON.stringify(filtered));
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  };

  // Установка отфильтрованных фильмов из локального хранилища
  useEffect(() => {
    if (searchedMovies) {
      setFilteredMovies(JSON.parse(searchedMovies));
    }
  }, [searchedMovies]);

  // Установка текущего поискового запроса из локального хранилища
  useEffect(() => {
    if (queries) {
      setSearchQuery(JSON.parse(queries));
    }
  }, [queries]);

  // Сброс фильтрации и очистка локального хранилища
  const handleResetInput = () => {
    setFilteredMovies([]);
    setSearchQuery({});
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('searchQueryMovies');
  };

  return (
    <main className="main">
      <section className="movies">
        <SearchForm
          onFilter={filterMovies}
          searchQuery={searchQuery}
          onResetInput={handleResetInput}
          filteredMovies={filteredMovies}
        />

        {isLoading ? <Preloader /> : (
          <>
            {filteredMovies.length ? (
              <MoviesCardList
                movies={filteredMovies}
                savedMovies={savedMovies}
                onSaveMovie={onSaveMovie}
                isLoading={isLoading}
              />
            ) : (
              searchedMovies && (
                <p className="movies__not-found">
                  Ничего не найдено
                </p>
              )
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Movies;