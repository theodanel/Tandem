import "../stylesheets/style.css";
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import logo from "../img/logo.png"

function Header() {


  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);


  const navigate = useNavigate();

  return (
    <header id="nav" className="active">
          <img src={logo} alt="" onClick={() => navigate("/")}/>
      <ul>
        {user ? (
          <li onClick={() => navigate("/logout")}>{user.name}</li>
        ) : (
          <li onClick={() => navigate("/login")}>Connexion</li>
        )}
        <li onClick={() => navigate("/create")}>Créer un projet</li>
        <li>Recherche</li>
        <li>Notifications</li>
      </ul>
      <div id="icons" ></div>
    </header>
  );
}

export default Header;
