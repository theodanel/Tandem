import React from 'react'
import Layout from '../components/Layout'
import projects from '../project'
import Project from '../components/Project';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';



function Home() {
    const navigate = useNavigate();
    const listProject = Object.keys(projects).map(key => {
        return (
            <Project
                key={key}
                name={projects[key].name}
                image={projects[key].image}
                description={projects[key].description}
                profil={projects[key].profil}
                language={projects[key].language}
                creator={projects[key].creator} >
            </Project>
        );
    });
    return (
        <Layout>

            <div>

                <h1>Faites germer vos projets</h1>
                <button onClick={() => navigate("/create")}>Créer un projet</button>

            </div>
            <div>

                <p>Barre de recherche</p>
                <p>Filtre x3 </p>

            </div>
            <div>

                <h1>Liste des projets</h1>
                <span>{projects.image}</span>

            </div>
            <div>

                <h1>Les coups de coeur + carousel de carte crée</h1>
                <Carousel/>
                

            </div>
            <div>
                <div>

                    {listProject}
                </div>
                <div>
                    <h1>Recommandations 2 </h1>
                    {listProject}
                </div>
                <div>
                    <p>En voir plus</p>
                </div>
                <div>
                    <h1>Les créateurs les plus actifs</h1>
                    <div>
                        <p>Liste des profil</p>
                    </div>
                </div>
            </div>
        </Layout>


    )
}

export default Home