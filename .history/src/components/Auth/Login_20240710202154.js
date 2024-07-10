import React, { useState } from "react";
import "./Login.scss";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert("Login");
  };
  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
      </div>
      <div className="title col-4 mx-auto">HoiDanIt</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot Password ?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Login to HoiDanIt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
