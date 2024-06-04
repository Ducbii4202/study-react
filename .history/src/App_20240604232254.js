import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import { Link } from "react-router-dom";
const App = () => {
  return (
    <div className="app-container">
      <Header></Header>
      <div>
        test link
        <div>
          <button>go to User page</button>
          <button>go to Admin page</button>
        </div>
      </div>
    </div>
  );
};

export default App;
