import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="nf-wrapper">
      <div className="nf-card">
        <h1 className="nf-code">404</h1>
        <h2 className="nf-title">Oops! Page Not Found</h2>
        <p className="nf-text">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button className="nf-btn" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
