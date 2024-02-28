import "../stylesheets/Home.scss";

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Project from "../components/Project";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
//Utilisation d'axios pour faire des appels à l'API
import axios from "../api/axios.js";
import { Skeleton } from "antd";
import SearchsBar from "../components/SearchsBar.js";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import { PiPlantLight, PiTreeLight } from "react-icons/pi";
import { LuNut } from "react-icons/lu";


const Home = () => {

  useEffect(() => {
    document.title = `Tandem`;
  }, []);

  // Récupération de l'utilisateur depuis le state global avec useSelector
  const user = useSelector(state => state.data.user);
  const navigate = useNavigate();
  // States permettant de stocker les états pour les projets, les utilisateurs, etc
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState(null);

  // Récupération des projets depuis l'API projects
  const getProjects = async () => {
    const res = await axios.get("/api/projects");
    setProjects(res.data.projects);
    setLoading(false);
  };

  // Idem pour les utilisateurs
  const getUsers = async () => {
    const resUsers = await axios.get("/api/users");
    setUsers(resUsers.data.users);
  };

  // Création d'une liste de projets à partir des projets récupérés au dessus
  const projectsList = [...projects].map((project) => { // Le ...projects permettant de créer une copie de la liste plutôt que de travailler directement avec la liste d'origine.
    return ( // Récupération des projets en les retournant sous forme d'un élément React
      <Project
        key={project.id}
        id={project.id}
        user={user}
      ></Project>
    );
  });

  // Création d'une liste de recommandations basées sur la popularité des projets
  const recommendationsList = [...projects].sort((a, b) => b.popularity - a.popularity).splice(0, 5).map((project) => {
    return (
      <Project
        key={project.id}
        id={project.id}
        user={user}
      ></Project>
    );
  });

  // Appel des fonctions pour obtenir les données au chargement du composant
  useEffect(() => {
    getUsers();
    getProjects();
  }, []);

  // Affichage des stats en dessous header
  const projectsCount = projects.length;
  const usersCount = users.length;
  const projectsCompleted = projects.filter(
    (project) => project.status === "completed"
  ).length;

  // Mise à jour des projets en fonction du terme de recherche
  const updateProjects = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Filtrage des projets en fonction de leur statut
  const filterProjectsByStatus = (status) => {
    if (filter === status) {
      // Si le filtre sélectionné est déjà appliqué retour à la liste complète des projets
      setFilter(null);
    } else {
      // Sinon le filtre affiche les projets en question
      setFilter(status);
    }
  };

  // Filtrage des projets en fonction du terme de recherche et du filtre de statut ( combinaison des deux filtres)
  useEffect(() => { // Exécution du UseEffect après chaque rendu où les dépendances "projects", "searchTerm" et "filter" ont été changés
    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(project =>
      filter === null || project.status === filter
    );

    setFilteredProjects(filtered);
  }, [projects, searchTerm, filter]);



  return (
    <Layout>
      <div className="home">
        <section className="hero">
          <div className="hero-image">
            <div className="hero-content">
              <h1 className="title">Faites germer vos projets</h1>
              <div className="hidden-md">
                <button id="home-button" className="btn-green-big" aria-label="Créer un projet" title="Créer un projet" onClick={() => navigate("/create")}>
                  Créer un projet
                </button>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <h3>Collaborateurs</h3>
                  <p id="home-NumberSub"><CountUp end={usersCount} /></p>
                </div>
                <div className="hero-stat">
                  <h3>Projets en cours</h3>
                  <p id="home-ProjetsEnCours"><CountUp end={projectsCount} /></p>
                </div>
                <div className="hero-stat">
                  <h3>Projets terminés</h3>
                  <p id="home-ProjectsClose"><CountUp end={projectsCompleted} /></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex search">
          <div>

            <SearchsBar searchTerm={searchTerm} onChange={updateProjects} />
            <div className="filter-buttons">
              <p>Filtres :</p>
              <button aria-label="Projets pas encore démarrés" title='Projets pas encore démarrés' className={filter !== "created"? "btn-green nut" : "nut-white"} onClick={() => filterProjectsByStatus("created")}><LuNut  size={40}/></button>
              <button aria-label='Projets en cours' title='Projets en cours' className={filter !== "ongoing"? "btn-green nut" : "nut-white"} onClick={() => filterProjectsByStatus("ongoing")}><PiPlantLight  size={40}/></button>
              <button  aria-label='Projets terminés' title='Projets terminés' className={filter !== "completed"? "btn-orange nut" : "tree-white"} onClick={() => filterProjectsByStatus("completed")}><PiTreeLight  size={40}/></button>
            </div>
          </div>
          <div className="hidden-sm">
            <button id="home-button" className="btn-green-big" aria-label="Créer un projet" title="Créer un projet" onClick={() => navigate("/create")}>
              Créer un projet
            </button>
          </div>
        </section>

        <section>
          <h2 className="subtitle title-green">Projets</h2>
          <Skeleton loading={loading} active>
            <div className="projectsList">
              {searchTerm === "" ? (
                filter !== null ? (
                  projects
                    .filter(project => project.status === filter)
                    .map(project => (
                      <Project
                        key={project.id}
                        id={project.id}
                        user={user}
                      />
                    ))
                ) : (
                  projectsList
                )
              ) : (
                filteredProjects.length > 0 ? (
                  filteredProjects.map(project => (
                    <Project
                      key={project.id}
                      id={project.id}
                      user={user}
                    />
                  ))
                ) : (
                  <p>Aucun projet ne correspond à votre recherche.</p>
                )
              )}
            </div>
          </Skeleton>
        </section>

        <section className="carousel">
          <h2 className="subtitle title-orange">Coups de coeur</h2>
          <Skeleton loading={loading} active>
            <Carousel />
          </Skeleton>
        </section>

        <section>
          <h2 className="subtitle title-green">Tendances</h2>
          <Skeleton loading={loading} active>
            <div className="projectsList">{recommendationsList}</div>
          </Skeleton>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
