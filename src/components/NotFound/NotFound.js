import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    const navigate = useNavigate();
    return (
        <section className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__subtitle">Страница не найдена</p>
            <button className="not-found__button" onClick={() => navigate(-1)}>Назад</button>
        </section>
    )
}

export default NotFound;
