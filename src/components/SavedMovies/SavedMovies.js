import React, { useEffect, useState } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm.js";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList.js";

function SavedMovies({ savedMovies, onDeleteMovie }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const searchedMovies = localStorage.getItem('searchedSavedMovies');
  const [searchQuery, setSearchQuery] = useState({});

  useEffect(() => {
    if (searchedMovies) {
      setFilteredMovies(JSON.parse(searchedMovies));
    } else {
      setFilteredMovies(savedMovies);
    }
  }, [searchedMovies, savedMovies]);

  const filterMovies = (query) => {

    let filtered = [];
    if (query.isShortFilmChecked) {
      filtered = savedMovies.filter((m) => {
        return (
          m.duration <= 40 &&
          m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase())
        );
      });
      setFilteredMovies(filtered);
    } else if (!query.isShortFilmChecked) {
      filtered = savedMovies.filter((m) => {
        return m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase());
      });
      setFilteredMovies(filtered);
    }
  };

  const handleResetInput = () => {
    setFilteredMovies(savedMovies);
    setSearchQuery({});
  };

  return (
    <main className="main">
      <section className="saved-movies">
        <SearchForm
          onFilter={filterMovies}
          searchQuery={searchQuery}
          onResetInput={handleResetInput}
          filteredMovies={filteredMovies}
        />
        {filteredMovies.length ? (
          <MoviesCardList movies={filteredMovies} onDeleteMovie={onDeleteMovie} isSavedMoviesPage={true} />
        ) : (
          searchedMovies && (
            <p className="movies__not-found">
              По вашему запросу ничего не найдено
            </p>
          )
        )}
      </section>
    </main>
  )
}
export default SavedMovies;


// function SavedMovies() {
//   return (
//     <main className="main">
//       <section className="saved-movies">
//         <SearchForm />
//         <MoviesCardList />
//       </section>
//     </main>
//   )
// }

// export default SavedMovies;