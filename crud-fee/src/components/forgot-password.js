import React, { useState } from "react";
import "../css/forgot-password.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [emailValue, setEmailValue] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleResetClicked = async () => {
    try {
      await axios.post(`http://localhost:8081/api/users/forgot-password/${emailValue}`);
      setSuccess(true);
      setTimeout(() =>  {
        navigate("/");
      }, 3000);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target.value);
    console.log(data.get("email"));
  };


  return success ? (
    <div>
      <h1>Success</h1>
      <p>Check your email for a reset link</p>
    </div>
  ) : (
    <div className="limiter">
      <div className="container-forgot">
        <img
          className="container-background"
          src="login-background.jpg"
          alt="background"
        />
        <div className="wrap-forgot">
          <form className="validate-form" onSubmit={handleSubmit}>
            <img
              className="forgot-form-logo"
              src="logo-vnpt-inkythuatso-01.png"
              alt="vnpt-logo"
            />
            <span className="forgot-form-title">
              <strong>Quên mật khẩu</strong>
            </span>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <div className="wrap-input validate-input">
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={emailValue}
                name="email"
                autoComplete="email"
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </div>
            <div className="container-forgot-form-btn">
              <button
                disabled={!emailValue}
                type="submit"
                className="forgot-btn"
                onClick={handleResetClicked}
              >
                <span>Đặt lại mật khẩu</span>
              </button>
            </div>
            <div className="text-center-forgot">
              <NavLink to="/">Quay lại đăng nhập</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
