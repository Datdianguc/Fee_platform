import React, { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
    }

    return (
            <div className="limiter">
                <div className="container-login">
                    <div className="wrap-login">
                        <form className="validate-form" onSubmit={handleLogin}>
                            <img src="vnpt-logo" className="login-form-logo" alt="vnpt-logo" />
                            <span className="login-form-title">Đăng nhập</span>
                            <div className="wrap-input">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="wrap-input">
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="container-login-form-btn">
                                <button type="submit">Đăng nhập</button>
                            </div>
                            <a className="forgot-password">
                                Quên mật khẩu?
                            </a>
                        </form>
                    </div>
                </div>
            </div>

    )
}

export default Login;