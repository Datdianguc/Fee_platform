import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../css/forgot-password.css";
import Login from "./login";

export default function ForgotPassword() {
  const [resetEmail, setResetEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.current.target);
    console.log(data.get("email"));
    //   // const url = process.env.REACT_APP_BACKEND_URL + "/api/forgotPassword"
    //   const res = await axios.post(url, { email: email });
    //   if ((res.data.success = false)) {
    //     toast.error(res.data.success, {
    //       autoClose: 5000,
    //       position: "top-right",
    //     });
    //   } else {
    //     toast.success(res.data.success, {
    //       autoClose: 5000,
    //       position: "top-right",
    //     });
    //   } catch {
    // toast.error("Co loi khong xac dinh da xay ra.", {
    //       autoClose: 5000,
    //       position: "top-right",
    // })}
  };
  // Xử lí API ở đây, dòng 12 cần url, 13 cũng vậy, chạy được thì bỏ cmt

  return (
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
            <div className="wrap-input validate-input">
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={resetEmail}
                name="email"
                autoComplete="email"
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <div className="container-forgot-form-btn">
              <button type="submit" className="forgot-btn">
                <span>Đặt lại mật khẩu</span>
              </button>
            </div>
            <div className="text-center">
              <Login className="return-login">
                Quay lại đăng nhập
              </Login>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
