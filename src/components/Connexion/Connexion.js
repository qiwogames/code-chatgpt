import React, { useState } from "react";
import "./Connexion.css";
import axios from "axios";
import Profile from "../Profile/Profile";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [est_connecter, setEstConnecter] = useState(false);

  const [users, setUsers] = useState([]);

  axios.get("http://localhost:3001/users").then((response) => {
    setUsers(users);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.get("http://localhost:3001/users");
    const users = response.data;
    const user = users.find((user) => user.email === email);
    console.log(users);
    //console.log(user.id);
    if (user) {
      if (user.password === password) {
        const token = user.id;
        const username = user.username;
        // Stocker le token dans le localStorage
        localStorage.setItem("token", token);
        console.log("vous etes connectez");
        setEstConnecter(true);
        window.location.href = `/profile/${username}`;
      } else {
        setError("Mot de passe incorrect !");
      }
    } else {
      setError("Utilisateur inconnu !");
    }
  };

  return (
    <div className="container w-50 p-3 bg-danger rounded shadow mt-5">
      {est_connecter ? (
        <Profile userID={users} />
      ) : (
        <div>
          <h2 className="taxt-info">CONNEXION</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-3"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p>{error}</p>}
            <button className="btn btn-info mt-3" type="submit">
              Se connecter
            </button>
            <hr />
            <p>Vous êtes nouveau ?</p>
            <a href="/inscription">Inscription</a>
          </form>
        </div>
      )}
    </div>
  );
}
