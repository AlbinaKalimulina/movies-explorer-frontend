import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm.js";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList.js";

function SavedMovies() {
  return (
    <main className="main">
      <section className="saved-movies">
        <SearchForm />
        <MoviesCardList />
      </section>
    </main>
  )
}

export default SavedMovies;