import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
    const location = useLocation();
    return (
        <section className="navigation">
            {location.pathname === '/' ? (
            <nav className="navigation__list">
                    <Link to="/signup" className="navigation__link">Регистрация</Link>
                    <Link to="/signin" className="navigation__link navigation__link_signin">Войти</Link>
            </nav>
            ) : (
            <nav className="navigation__list">
                    <Link to="/movies" className="navigation__link">Фильмы</Link>
                    <Link to="/saved-movies" className="navigation__link">Сохранённые фильмы</Link>
                    <Link to="/profile" className="navigation__link">Аккаунт</Link>
                    <Link to="/profile" className="navigation__link navigation__link_profile"/>
            </nav>
            )}
        </section>
    )
}

export default Navigation;
