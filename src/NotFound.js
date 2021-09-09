import React from 'react';
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <article className="container">
            <h1>404!</h1>
            <p>Content Not Found</p>
            <Link to="/">Back To Home</Link>
        </article>
    )
}

export default NotFound;
