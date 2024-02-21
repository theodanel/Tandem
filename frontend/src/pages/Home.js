import "../stylesheets/Home.scss";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Project from "../components/Project";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
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
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProjects = async () => {
        const res = await axios.get("/api/projects");
        const resUsers = await axios.get('/api/users');
        setProjects(res.data.projects);
        setUsers(resUsers.data.users);
        setLoading(false);
    };

    useEffect(() => {
        getProjects();
    }, []);

    
    const projectsList = projects.slice(0, 8).map(project => {
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

    const recommendationsList = projects.slice(2, 6).map(project => {
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
    const projectsCount = projects.length;
    const usersCount = users.length;
    const projectsCompleted = projects.filter(project => project.status === "completed").length;

    return (
        <Layout>
            <div className="hero">

                <div className="hero-content">

                    <h1 className="title">Faites germer vos projets</h1>
                    <div id="home-top">
                        <button id="home-button" onClick={() => navigate("/create")}>Créer un projet</button>
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <h3>Nombre de projets en cours</h3>
                            <p id="home-ProjetsEnCours">{projectsCount}</p>
                        </div>
                        <div className="hero-stat">
                            <h3>Nombre d'abonnés</h3>
                            <p id="home-NumberSub">{usersCount}</p>
                        </div>
                        <div className="hero-stat">
                            <h3>Nombre de projets terminés</h3>
                            <p id="home-ProjectsClose">{projectsCompleted}</p>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <SearchBar />
                <p>Filtre x3 </p>
            </div>
            <h2 className="subtitle title-green">Projets</h2>
            <div className='project'>
                <div className="projectsList">{projectsList}</div>
            </div>
            <Skeleton loading={loading} active>
                <div>
                    <div className="carousel">
                        <h2 className="subtitle title-orange">Coups de coeur</h2>
                        <Carousel />
                    </div>
                </div>
                <div>
                    <div>
                        <h2 className="subtitle title-green">Recommandations</h2>
                        <div className="projectsList">
                            {recommendationsList}
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
