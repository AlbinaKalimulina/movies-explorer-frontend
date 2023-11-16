import React, { useEffect, useState } from "react";
import MoviesCardList from "./MoviesCardList/MoviesCardList.js";
import SearchForm from "./SearchForm/SearchForm.js";
import Preloader from "./Preloader/Preloader.js";

import moviesApi from '../../utils/MoviesApi';

function Movies({ savedMovies, onLikeMovie }) {
  const [filteredMovies, setFilteredMovies] = useState([]); //массив отфильтрованных фильмов
  const searchedMovies = localStorage.getItem('searchedMovies'); //данные о поисковом запросе из локального хранилища
  const queries = localStorage.getItem('searchQueryMovies'); //данные об отфильтрованных фильмах из локального хранилища
  const [searchQuery, setSearchQuery] = useState({}); //состояние текущего поискового запроса
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки данных
  const [movies, setMovies] = useState([]); //состояние для хранения полного списка фильмов


  //Загрузка полного списка фильмов из внешнего API при первом рендере страницы
  useEffect(() => {
    moviesApi.getMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);


  //Установка отфильтрованных фильмов из локального хранилища
  useEffect(() => {
    if (searchedMovies) {
      setFilteredMovies(JSON.parse(searchedMovies));
    }
  }, [searchedMovies]);

  //Установка текущего поискового запроса из локального хранилища
  useEffect(() => {
    if (queries) {
      setSearchQuery(JSON.parse(queries));
    }
  }, [queries]);


  // Фильтрует фильмы в соответствии с переданным запросом:
  // - проверяет наличие фильтрованных фильмов и устанавливает состояние загрузки
  // - создает задержку для имитации процесса загрузки данных
  // - отфильтровывает фильмы в соответствии с запросом и обновляет состояние filteredMovies и локального хранилища
  // - устанавливает состояние завершения загрузки данных
  const filterMovies = (query) => {
    if (!filteredMovies.length) {
      setIsLoading(true);
    }

    setTimeout(() => {
        let filtered = [];
        localStorage.setItem('searchQueryMovies', JSON.stringify(query));

        if (query.isShortFilmChecked) {
          filtered = movies.filter((m) => {
            return (
              m.duration <= 40 &&
              m.nameRU
                .toLowerCase()
                .trim()
                .includes(query.searchText.toLowerCase())
            );
          });

          setFilteredMovies(filtered);
          localStorage.setItem('searchedMovies', JSON.stringify(filtered));
        } else if (!query.isShortFilmChecked) {
          filtered = movies.filter((m) => {
            return m.nameRU
              .toLowerCase()
              .trim()
              .includes(query.searchText.toLowerCase());
          });

          setFilteredMovies(filtered);
          localStorage.setItem('searchedMovies', JSON.stringify(filtered));
        }
        setIsLoading(false)
      },
      filteredMovies.length ? 0 : 300
    );
  };


  //сбрасывает фильтрацию и очищает локальное хранилище от данных о поиске
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
                onLikeMovie={onLikeMovie}
                isLoading={isLoading}
              />
            ) : (
              searchedMovies && (
                <p className="movies__not-found">
                  По вашему запросу ничего не найдено
                </p>
              )
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default Movies;









