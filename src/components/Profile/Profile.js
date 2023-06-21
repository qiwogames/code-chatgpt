import React, { useEffect, useState } from "react";
import "./Profile.css";
import LeftNavigation from "../LeftNavigation/LeftNavigation";
import { useParams } from "react-router-dom";

import Auth from "../../Auth";
import axios from "axios";

function Profile() {
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const [produits, setProduit] = useState([]);

  //Action
  const afficher_produit = () => {
    axios
      .get(`http://localhost:3001/users?username=${username}`)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((erreur) => console.error(erreur));
  };

  useEffect(() => {
    afficher_produit();
  }, []);
  //Rendu

  const deconnexion = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-3 col-sm-12">
          <button onClick={deconnexion} className="btn btn-info mt-3">
            Deconnexion
          </button>
          <LeftNavigation />
        </div>
        <div className="col-md-9 col-sm-12">
          <h2 className="text-warning">
            Bienvenue <b className="text-danger">{username}</b> sur votre
            TABLEAU DE BORD
          </h2>
          <h3 className="text-success">Vos produits : </h3>
          {users.map(({ produits }, index) => {
            {
              produits.map(({ produit }) => (
                <div className="card">
                  <h3>{produit.nom_produit}</h3>
                </div>
              ));
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Auth(Profile);
