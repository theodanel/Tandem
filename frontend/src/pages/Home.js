import "../stylesheets/Home.scss";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Project from "../components/Project";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import germe from '../img/germe.png';
import germerwhite from '../img/germerwhite.png';
import SearchBar from "../components/SearchBar";
import axios from "../api/axios.js";
import { Skeleton } from "antd";


const Home = () => {
    useEffect(() => {
        document.title = `Tandem`;
    }, []);

    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

  const getProjects = async () => {
    const res = await axios.get("/api/projects");
    setProjects(res.data.projects);
    setLoading(false);
  };

  useEffect(() => {
    getProjects();
  }, []);
  
  const listProject = projects.slice(0, 2).map(project => {
      return (
          <Project
              key={project.id}            
              title={project.title}
              image={project.image}
              description={project.description}
              status={project.status}
              languages={project.languages}
              creator_id={project.user_id} 
              id={project.id}>
          </Project>
      );
  });

    return (
        <Layout>
            <div className="hero">
                <img src={germe} alt="Faites germer vos projets" className="hero-image" />
                <div className="hero-content">
                    <img src={germerwhite} alt="" id="germerwhite" />
                    <div id="home-top">
                        <button id="home-button" onClick={() => navigate("/create")}>Créer un projet</button>
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <h3>Nombre de projets en cours</h3>
                            <p id="home-ProjetsEnCours">300</p>
                        </div>
                        <div className="hero-stat">
                            <h3>Nombre d'abonnés</h3>
                            <p id="home-NumberSub">4 052 470 001</p>
                        </div>
                        <div className="hero-stat">
                            <h3>Nombre de projets terminés</h3>
                            <p id="home-ProjectsClose">69</p>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <SearchBar />
                <p>Filtre x3 </p>
            </div>
                <h1 className="title-project">Liste des projets</h1>
                <div className='project'>
                {/* {projects?.filter((project) => project).slice(0, 2).map((project) => (
                    <div>
                        <img src={project.image} className="project-image"/>
                        <h2>{project.title}</h2>
                        <p className="project-description">{project.description}</p>
                    </div>
                ))} */}
                <div>{listProject}</div>
            </div>
            <Skeleton loading={loading} active>
            <div>
                <div className="carousel">
                    <h1 className="title-coeur">Les coups de coeur</h1>
                    <Carousel />
                </div>
            </div>
            <div>
                <div>
                    <h1 className="title-project">Recommandations</h1>
                    <div className='project'>
                {projects?.filter((project) => project).slice(2 , 6).map((project) => (
                    <div>
                        <img src={project.image} className="project-image" />
                        <h2>{project.title}</h2>
                        <p className="project-description">{project.description}</p>
                    </div>
                ))}
            </div>
                </div>
                <div>
                    <p>En voir plus</p>
                </div>
            </div>

            </Skeleton>
        </Layout>

    );
};

export default Home;
