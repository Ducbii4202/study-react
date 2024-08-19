import React from "react";
import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-short"> There's a better way to ask</div>
        <div className="title-long">
          You don't want to make a boring form And your audience won't answer
          one. Create a typeform instead-and make everone happy.
        </div>
        <div className="title-1">
          {isAuthenticated === false ? (
            <button onClick={() => navigate("./login")}>
              Get's started. It's free
            </button>
          ) : (
            <button>Doing Quiz Now</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
