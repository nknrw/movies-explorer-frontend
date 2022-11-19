import React from "react";
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a href="" className="portfolio__link">Статичный сайт</a>
                    <a href="" className="portfolio__link">Адаптивный сайт</a>
                    <a href="" className="portfolio__link">Одностраничное приложение</a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;
