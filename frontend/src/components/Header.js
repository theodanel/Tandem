import "../stylesheets/MenuBurger.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import logo from "../img/logo.png"


function Header() {

  const [showTiret, setShowTiret] = useState(false)
  const handleShowTiret = () => {
    setShowTiret(!showTiret)
  }

  const changeRoute = (path) => {
    handleShowTiret()
    navigate(path)
  }

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  /**
   * Pour bien récupérer l'utilisateur après connexion
   */
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")) || null)
  }, [])

  const navigate = useNavigate();

  return (

    <header className={`navbar ${showTiret ? "show-nav" : "false"} `}>
      <div id="imgproject">
        <img src={logo} alt="" onClick={() => changeRoute("/")}/>
      </div>
      
      <ul className="all-item">

        {user ? (
          <li className="item slideInDown-1" onClick={() => changeRoute(`/user/${user.id}`)}>
            <p className="item-p">{user.name}</p>
          </li>
        ) : (
          <li className="item slideInDown-2"  onClick={() => changeRoute("/login")}>
            <p className="item-p">Connexion</p>
          </li>
        )}
        <li className="item slideInDown-3" onClick={() => changeRoute("/create")}>
          <p className="item-p">Créer un projet</p>
        </li>

        <li className="item slideInDown-4" >
          <p className="item-p" onClick={()=>navigate('/')}>Recherche</p>
        </li>
        {/* {user ? 
        <li className="item slideInDown-5" >
          <p className="item-p">Notifications</p>
        </li>
        : ''} */}
      </ul>
      <button className="separation" onClick={()=>handleShowTiret()}>
        <span className="tiret"></span>
      </button>
    </header>
  );
}

export default Header;
