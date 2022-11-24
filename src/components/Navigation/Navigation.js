import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import profileIcon from "../../images/profile-icon.svg";

function Navigation() {
    const location = useLocation();
    return (
        <nav className="navigation">
            {location.pathname === '/' ? (
            <ul className="navigation__list">
                <li className="navigation__list-item">
                    <Link to="/signup" className="navigation__link">Регистрация</Link>
                </li>
                <li className="navigation__list-item">
                    <Link to="/signin" className="navigation__link navigation__link_signin">Войти</Link>
                </li>
            </ul>
            ) : (
            <ul className="navigation__list">
                <li className="navigation__list-item">
                    <Link to="/movies" className="navigation__link">Фильмы</Link>
                </li>
                <li className="navigation__list-item">
                    <Link to="/saved-movies" className="navigation__link">Сохранённые фильмы</Link>
                </li>
                <li className="navigation__list-item">
                    <Link to="/profile" className="navigation__link">Аккаунт</Link>
                    <img className="navigation__profile-icon" src={profileIcon} alt="Иконка профиля" />
                </li>
            </ul>
            )}
        </nav>
    )
}

export default Navigation;
