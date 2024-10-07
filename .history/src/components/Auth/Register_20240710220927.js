import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return <div></div>;
};

export default Register;
