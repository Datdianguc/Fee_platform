import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Ôi không!</h1>
            <p>Có lỗi không xác định đã xảy ra.</p>
            <p>
                <i>{error.statusPage || error.message}</i>
            </p>
        </div>
    );
}