import "../stylesheets/style.css";
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
//import axios from '../api/axios';

function Header() {


  // const {user, getUser} = useAuthContext();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  //const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")) || null);

  // useEffect(()=> {
  //   if(!user && token){
  //     getUser();
  //   }
  // }, []);


  // const getUser = async () => {
  //   const {data} = await axios.get(`/api/user`, {headers:{"Authorization":`Bearer ${token}`}});
  //   setUser(data);
  // }

  const navigate = useNavigate();

  return (
    <header id="nav" className="active">
          <h1 className="tandem" onClick={() => navigate("/")}>
            Tandem
          </h1>
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
