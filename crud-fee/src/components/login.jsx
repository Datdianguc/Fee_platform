import React, { useState } from "react";
import "../css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="limiter">
      <div className="container-login">
        <img
          className="container-background"
          src="login-background.jpg"
          alt="background"
        />
        <div className="wrap-login">
          <form className="validate-form" onSubmit={handleLogin}>
            <img
              src="logo-vnpt-inkythuatso-01.png"
              className="login-form-logo"
              alt="vnpt-logo"
            />
            <span className="login-form-title">
              <strong>Đăng nhập</strong>
            </span>
            <div className="wrap-input validate-input">
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="wrap-input validate-input">
              <input
                id="password"
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="container-login-form-btn">
              <button type="submit" className="login-btn">
                <span>Đăng nhập</span>
              </button>
            </div>
            <div className="text-center">
              <a href="#" className="forgot-password">
                Quên mật khẩu?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
