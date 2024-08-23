import React, { useState } from "react";
import "../css/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post("http://192.168.1.7:8081/api/users/login", {username: email, password });
     if (res.data.status) {
      navigate("/dashboard")
     }
    } catch (e) {
      console.log("Có lỗi không xác định đã xảy ra", e);
    }
  };

  return (
    <>
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
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="wrap-input validate-input">
                <input
                  id="password"
                  type="password"
                  placeholder="Mật khẩu"
                  name="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="container-login-form-btn">
                <button type="submit" className="login-btn">
                  <span>Đăng nhập</span>
                </button>
              </div>
              <div className="text-center-forgot">
                <NavLink to="/forgot-password">Quên mật khẩu?</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
