import React from "react";
import "./SearchForm.css";
// import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
        <form className="search-form">
            <input className="search-form__input" type="text" placeholder="Фильм" />
            <button className="search-form__button" type="submit">Поиск</button>
            {/* <FilterCheckbox /> */}
        </form>
    )
}

export default SearchForm;
