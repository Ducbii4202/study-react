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
          <button>
            <Link to="/users">go to User page</Link>
          </button>
          <button>
            <Link to="/users">go to Admin page</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
