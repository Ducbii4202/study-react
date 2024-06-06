import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
      </div>

      <div>
        test link
        <div>
          <button>
            <Link to="/users">go to User page</Link>
          </button>
          <button>
            <Link to="/admins">go to Admin page</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
