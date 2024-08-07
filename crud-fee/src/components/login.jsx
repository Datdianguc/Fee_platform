import React, { useState } from "react";
import "../css/login.css";
import ForgotPassword from "./forgot-password";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData(e.current.target);
    console.log(
      data.get({
        email: data.get("email"),
        password: data.get("password"),
      })
    );
    // const url = process.env.REACT_APP_BACKEND_URL + "/api/login";
    // try {
    //   const res = await axios.post(url, { email, password });
    //   if (res.data.success === false) {
    //     toast.error(res.data.message, {
    //       autoClose: 5000,
    //       position: "top-right",
    //     });
    //   } else {
    //     toast.success("Login successful!", {
    //       autoClose: 5000,
    //       position: "top-right",
    //     });
    //     // Handle successful login (e.g., redirect, store token)
    //   }
    // } catch (error) {
    //   toast.error("An error occurred while processing your request.", {
    //     autoClose: 5000,
    //     position: "top-right",
    //   });
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
              <div className="text-center">
                <ForgotPassword className="forgot-password">
                  Quên mật khẩu?
                </ForgotPassword>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
