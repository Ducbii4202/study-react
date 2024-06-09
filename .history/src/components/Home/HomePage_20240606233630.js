import React from "react";
import videoHomepage from "../../assets/video-homepage.mp4";

const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="homepage-title"></div>
        <div className=""></div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default HomePage;
