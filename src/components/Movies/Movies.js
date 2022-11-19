import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function Movies() {
    return (
        <section className="movies">
            <SearchForm />
            <MoviesCardList />
        </section>
    )
}

export default Movies;
