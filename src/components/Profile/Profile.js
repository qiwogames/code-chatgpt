import React from "react";
import PropTypes from "prop-types";
import "./Profile.css";

export default function Profile() {
  const deconnexion = () => {
    localStorage.removeItem("token");
    window.location.href = "/connexion";
  };

  return (
    <div className="container w-50 p-3">
      <button onClick={deconnexion} className="btn btn-danger mt-3">
        Deconnexion
      </button>
    </div>
  );
}
