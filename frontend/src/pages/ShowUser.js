import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Project from '../components/Project';
import Layout from '../components/Layout';
import User from '../components/User';
import Language from '../components/Language';
import "../stylesheets/UserDetail.scss";
import axios from '../api/axios.js';
import { Skeleton } from 'antd';

const UserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [languages, setLanguages] = useState([]);
    const [projectsList, setProjectsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const data1 = await fetch("http://127.0.0.1:8000/api/languages").then(res => res.json());
        setLanguages(data1.languages);
        const data2 = await fetch("http://127.0.0.1:8000/api/projects").then(res => res.json());
        setProjectsList(data2.projects.filter(project=>project.user_id == id ).map(project => {
            return (
                <Project
                    key={project.id}
                    name={project.name}
                    image={project.image}
                    description={project.description}
                    profil={project.profil}
                    languages={project.languages}
                    creator_id={project.user_id} >
                </Project>
            );
        }));
   
        const res = await axios.get(`/api/user/${id}`);
        setUser(res.data.user);
        document.title = `${res.data.user.name}`;
        setLoading(false);
    }
    useEffect(() => {
        getData();
    }, [])

    const languagesList = user.languagesList?.map((language, index) => {
        return (
            <Language key={language.id}
            name={language.name}
            image={language.logo}
            />
        );
    });
      
    return (
        <Layout>
            <Skeleton  loading={loading} active>
            <div id='user'>
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
                        {projectsList}
                    </div>
                </div>
            </div>                
            </Skeleton>
        </Layout>
    )
}

export default UserPage