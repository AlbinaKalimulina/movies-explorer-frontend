import { useEffect, useState } from "react";
import Search from '../../../images/search.svg';

const SearchForm = ({ onFilter, searchQuery, filteredMovies }) => {
  const isChecked = JSON.parse(localStorage.getItem('filterCheckBox'));
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(isChecked);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchQuery.searchText) {
      setSearchText(searchQuery.searchText);
    }
  }, [searchQuery.searchText]);

  useEffect(() => {
    setIsShortFilmChecked(searchQuery.isShortFilmChecked || false);
  }, [searchQuery.isShortFilmChecked]);

  const checkFilterBox = () => {
    const newIsShortFilmChecked = !isShortFilmChecked;
    setIsShortFilmChecked(newIsShortFilmChecked);
    localStorage.setItem('filterCheckBox', JSON.stringify(newIsShortFilmChecked));

    if (filteredMovies.length > 0) {
      onFilter({ searchText, isShortFilmChecked: newIsShortFilmChecked });
    }

  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() === '') {
      setError('Введите ключевое слово');
    } else {
      setError('');
      onFilter({ searchText, isShortFilmChecked });
    }
  };

  return (
    <section className="searchform">
      <form className="searchform__form-wrapper" action="#" name="search-form" onSubmit={onSubmit} noValidate>
        <div className="searchform__form">
          <div className="searchform__input-container">
            <div className="searchform__icon"></div>
            <div className="searchform__input-wrapper">

              <input
                type="text"
                className="searchform__input"
                name="film-search"
                placeholder="Фильм"
                required
                minLength={3}
                maxLength={300}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value.toLowerCase())}
              />

            </div>
          </div>


          <button className="searchform__btn" type="submit" src={Search}>
            Найти
          </button>

        </div>

        <div className="searchform__filter-container">

          <p className="searchform__filter-title" htmlFor="short-films">Короткометражки</p>

          <div className="searchform__filter">
            <input
              type="checkbox"
              id="checkbox"
              className="searchform__filter__ckeck"
              onChange={checkFilterBox}
              checked={isShortFilmChecked}
            />
          </div>

        </div>

      </form >

      {error && <p className="search-form__error">{error}</p>}

    </section >
  );
};

export default SearchForm;