import React from "react";
import "./AboutMe.css";
// import photo from "../../images/photo.jpg";

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__info">
                <div className="about-me__info-container">
                    <h3 className="about-me__name">Андрей</h3>
                    <p className="about-me__profession">Фронтенд-разработчик, 27 лет</p>
                    <p className="about-me__about">Тут будет описание</p>
                    <ul className="about-me__links">
                        <li className="about-me__link">Тут будет ссылка</li>
                        <li className="about-me__link">Тут будет ссылка</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
