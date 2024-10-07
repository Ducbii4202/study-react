import React from "react";
import "./Login.scss";

const Login = (props) => {
  return (
    <div className="login-container">
      <div className="header">Do'nt have an account yet?</div>
      <div className="title">HoiDanIt</div>
      <div className="welcome">Hello, who's this?</div>
      <div className="content-form">
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

export default Login;
