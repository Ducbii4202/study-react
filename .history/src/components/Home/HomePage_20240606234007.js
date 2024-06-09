import React from "react";
import videoHomepage from "../../assets/video-homepage.mp4";

const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-long"> There's a better way to ask</div>
        <div className="title-short">
          You don't want to make a boring form And your audience won't answer
          one. Create a typeform instead-and make everone happy.
        </div>
        <div className="title-button">
          <button>Get's started. It's free</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
