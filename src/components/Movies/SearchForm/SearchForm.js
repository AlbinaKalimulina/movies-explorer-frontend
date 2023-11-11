import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm() {

  return (
    <section className="searchform">
      <form className="searchform__form-wrapper" action="#" name="search-form">
        <div className="searchform__form">
          <div className="searchform__input-container">
            <div className="searchform__icon"></div>
            <div className="searchform__input-wrapper">
              <input
                type="text"
                className="searchform__input"
                placeholder="Фильм"
                required
              />
            </div>
          </div>
          <button className="searchform__btn" type="submit">
            Найти
          </button>
        </div>
        <div className="searchform__filter-container">
          <FilterCheckbox />
          <p className="searchform__filter-title">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;