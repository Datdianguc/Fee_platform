import React from "react";
import { useRouteError } from "react-router-dom";
import "../src/css/error-page.css"
export default function ErrorPage() {
    const error = useRouteError();
    console.error("Error Page", error);

    return (
        <div className="error-page-container">
            <h1>Ôi không!</h1>
            <p>Có lỗi không xác định đã xảy ra.</p>
        </div>
    );
}

