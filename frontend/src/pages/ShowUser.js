import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Project from '../components/Project';
import Layout from '../components/Layout';
import User from '../components/User';
import Language from '../components/Language';
import "../stylesheets/UserDetail.scss";

const UserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState([]);
    const [languages, setLanguages] = useState([]);


    const getLanguages = async () => {
        const data = await fetch("http://127.0.0.1:8000/api/languages").then(res => res.json());

        setLanguages(data.languages);
    }

    useEffect(() => {
        getLanguages();
    }, []);


    const languagesList = languages.map((language, index) => {
        return (
            <Language key={language.id}
                name={language.name}
                image={language.logo}
            />
        );
    });

    const getProjects = async () => {
        const data = await fetch("http://127.0.0.1:8000/api/projects").then(res => res.json());

        setProjects(data.projects);
        console.log(data.projects)
    }

    useEffect(() => {
        getProjects();
    }, []
    )
    const listProject = projects.map(project => {
        return (
            <Project
                key={project.id}
                name={project.name}
                image={project.image}
                description={project.description}
                profil={project.profil}
                language={project.language}
                creator={project.creator} >
            </Project>

        );

    });
    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const data = await fetch(`http://127.0.0.1:8000/api/user/${id}`).then(res => res.json());

        setUser(data.user);
        console.log(data.user)
    }
    return (
        <Layout>
            <div>
                <div id='user-avatar'>
                    <img src={`http://localhost:8000/images/avatars/${user.avatar}`} />
                </div>
                <div id='user-name'>
                    <User
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        id={user.id}>
                    </User>
                </div>
                <div id='user-language'>
                    <legend name="languages" id="languages" value={user.languages} required>
                        {languagesList}
                    </legend>
                </div>
                <div id='user-project'>
                    <div id='user-div'>
                        <h1>projets</h1>
                        <button id='user-button-project'>+</button>
                    </div>
                    <div>
                        {listProject}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserPage