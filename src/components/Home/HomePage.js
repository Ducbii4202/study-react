import React from "react";
import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="homepage-container">
      <video
        className="homepage-video"
        autoPlay
        loop
        muted
        aria-label={t("homepage.videoAlt", "Background video")}
      >
        <source src={videoHomepage} type="video/mp4" />
        {t(
          "homepage.videoFallback",
          "Your browser does not support video playback."
        )}
      </video>

      <div className="homepage-content">
        <h1 className="homepage-title title-1">
          {t("homepage.title1", "Welcome to our platform!")}
        </h1>
        <h2 className="homepage-title title-2">
          {t("homepage.title2", "Explore and enjoy.")}
        </h2>
        <div className="homepage-actions title-3">
          {isAuthenticated ? (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/users")}
            >
              {t("homepage.title3.doing", "Start Doing")}
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/login")}
            >
              {t("homepage.title3.login", "Login")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
