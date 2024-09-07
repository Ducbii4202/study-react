import React from "react";
import "./Login.scss";

const Login = (props) => {
  return (
    <div className="login-container">
      <div className="header">Do'nt have an account yet?</div>
      <div className="title col-4">HoiDanIt</div>
      <div className="welcome col-4">Hello, who's this?</div>
      <div className="content-form col-4">
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" />
        </div>
      </div>
    </div>
  );
};

export default Login;
