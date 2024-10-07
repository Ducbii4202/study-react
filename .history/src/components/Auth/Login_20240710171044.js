import React, { useState } from "react";
import "./Login.scss";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <div className="header">Do'nt have an account yet?</div>
      <div className="title col-4 mx-auto">HoiDanIt</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input type={"email"} className="form-control" value={email} onChange={()=>setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type={"password"} className="form-control" value={password} onChange={()=>setPasswordl(e.target.value)/>
        </div>
        <span className="forgot-password">Forgot Password ?</span>
        <div>
          <button className="btn-submit">Login to HoiDanIt</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
