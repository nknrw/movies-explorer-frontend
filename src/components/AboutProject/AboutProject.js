import React from "react";
import "./AboutProject.css";

function AboutProject() {
    return (
    <section className="about-project">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__container">
            <div className="about-project__text-container">
                <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className="about-project__text-container">
                <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
        </div>
        <div className="about-project__container">
            <div className="about-project__text-container">
                <p className="about-project__text about-project__text_type_bold">1 неделя</p>
                <p className="about-project__text">Back-end</p>
            </div>
            <div className="about-project__text-container">
                <p className="about-project__text about-project__text_type_bold">4 недели</p>
                <p className="about-project__text">Front-end</p>
            </div>
        </div>
    </section>
    );
}

export default AboutProject;
