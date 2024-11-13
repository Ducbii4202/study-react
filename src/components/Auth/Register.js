import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { toast } from "react-toastify";
import { postRegister } from "../../services/apiService";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Languages from "../Header/Languages";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsaernamed] = useState("");
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    if (!password) {
      toast.error("Invalid password");
      return;
    }
    //submit Api
    let data = await postRegister(email, username, password);
    if (data && +data.EC === 0) {
      navigate("/login");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="regiter-container">
      <div className="header">
        <span>Already have an account ?</span>
        <button onClick={() => navigate("/login")}>Log in</button>
        <Languages />
      </div>
      <div className="title col-4 mx-auto">Wordaholic</div>
      <div className="welcome col-4 mx-auto">Start your journey</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email (*)</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>Password (*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isShowPassword ? (
            <span
              className="icons-eye"
              onClick={() => setIsShowPassword(false)}
            >
              <VscEye />
            </span>
          ) : (
            <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type={"username"}
            className="form-control"
            value={username}
            onChange={(e) => setUsaernamed(e.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot Password ?</span>
        <div>
          <button className="btn-submit" onClick={() => handleRegister()}>
            Register
          </button>
        </div>
        <div className="text-center">
          <span
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            &#60;&#60; Go to HomePage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
