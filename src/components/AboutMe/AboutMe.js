import React from "react";
import "./AboutMe.css";
import photo from "../../images/about-me-photo.jpg";
import linkIcon from "../../images/link-icon.svg";

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__info">
                <div className="about-me__info-container">
                    <h3 className="about-me__name">Андрей</h3>
                    <p className="about-me__profession">Фронтенд-разработчик, 27 лет</p>
                    <p className="about-me__about">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <img className="about-me__photo" src={photo} alt="Фото студента" />
            </div>
            <h3 className="about-me__links-title">Портфолио</h3>
                <ul className="about-me__links">
                    <li className="about-me__link">Статичный сайт<a href=""><img className="about-me__link-icon" src={linkIcon} alt="Ссылка"/></a></li>
                    <li className="about-me__link">Адаптивный Сайт<a href=""><img className="about-me__link-icon" src={linkIcon} alt="Ссылка"/></a></li>
                    <li className="about-me__link">Одностраничное приложение<a href=""><img className="about-me__link-icon" src={linkIcon} alt="Ссылка"/></a></li>
                </ul>
        </section>
    );
}

export default AboutMe;
