import React from "react";
import "./Navigation.css";

function Navigation() {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__list-item">
                    <a href="#movies" className="navigation__link">Фильмы</a>
                </li>
                <li className="navigation__list-item">
                    <a href="#saved-movies" className="navigation__link">Сохранённые фильмы</a>
                </li>
                <li className="navigation__list-item">
                    <a href="#profile" className="navigation__link">Аккаунт</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;
