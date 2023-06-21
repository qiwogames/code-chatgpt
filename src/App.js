import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Connexion from "./components/Connexion/Connexion";
import Profile from "./components/Profile/Profile";
import Inscription from "./components/Inscription/Inscription";

function App() {
  const [est_connecter, setEstConnecter] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setEstConnecter(!!token); //Retourne true si le token existe
    //console.log(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />}></Route>
        <Route path="/inscription" element={<Inscription />}></Route>
        <Route exact path="/" element={<Connexion />}></Route>
        <Route
          exact
          path="/profile/:username"
          element={est_connecter ? <Profile /> : <Connexion />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
