import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    const navigate = useNavigate();
    return (
        <section className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__subtitle">Страница не найдена</p>
            <Link className="not-found__link" to={'/'}>Назад</Link>
        </section>
    )
}

export default NotFound;
