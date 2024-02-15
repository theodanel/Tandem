import "../stylesheets/style.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

function Header() {
  const { user, getUser } = useAuthContext();


  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);
  const navigate = useNavigate();

  return (
    <nav id="nav" className="active">
          <h1 className="tandem" onClick={() => navigate("/")}>
            Tandem
          </h1>
      <ul>
        <li>
        <li>
          {user ? (
            <p onClick={() => navigate("/login")}>{user.name}</p>
          ) : (
            <p onClick={() => navigate("/login")}>Connexion</p>
          )}
        </li>
        </li>
        <li>
          <p onClick={() => navigate("/create")}>Créer un projet</p>
        </li>

        <li>
          <p>Recherche</p>
        </li>
        <li>
          <p>Notifications</p>
        </li>
      </ul>
      <div id="icons" ></div>
    </nav>
  );
}

export default Header;
