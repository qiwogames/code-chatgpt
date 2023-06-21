import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Inscription.css";
import axios from "axios";

export default function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [erreur, setErreur] = useState("");
  const [est_inscrit, setEstInscrit] = useState(false);

  const email_handle_change = (e) => {
    setEmail(e.target.value);
  };

  const password_handle_change = (e) => {
    setPassword(e.target.value);
  };

  const new_users = {
    email: email,
    password: password,
  };

  const inscription = () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      setErreur("Erreur");
    } else {
      axios
        .post("http://localhost:3001/users", new_users)
        .then((response) => {
          console.log(response.data);
          console.log("Utilisateur ajouté avec succès !");
          setEstInscrit(true);
        })
        .catch((erreur) => {
          setErreur("Erreur d'inscription de l'utilisateur !", erreur);
        });
    }
  };

  return (
    <div className="container w-25 p-3 bg-info rounded shadow mt-5">
      {est_inscrit ? (
        <div className="alert alert-danger p-3">
          <h2 className="text-success mt-3">Merci pour votre inscription !</h2>
          <a href="/" className="btn btn-warning">
            Connexion
          </a>
        </div>
      ) : (
        <div>
          <h2>Inscription</h2>
          <form>
            <div>
              <label>Nom d'utilisateur:</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={email_handle_change}
              />
              {erreur ? (
                <div className="alert alert-danger p-3 mt-3">
                  Merci de remplir tous les champs ou d'entrer un nom
                  d'utilisateur disponible !
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              <label>Mot de passe:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={password_handle_change}
              />
              {erreur ? (
                <div className="alert alert-danger p-3 mt-3">
                  Merci de remplir tous les champs ou d'entrer un nom
                  d'utilisateur disponible !
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <button
              className="btn btn-success mt-3"
              type="button"
              onClick={inscription}
            >
              Se connecter
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
