import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Project from './Project';
import Layout from './Layout';
import User from './User';


const UserPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState([]);

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
                name={project.name}
                image={project.image}
                description={project.description}
                profil={project.profil}
                language={project.language}
                creator={project.creator} >
            </Project>

        );

    });
    useEffect(()=>{
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
                <h1>profil/user API</h1>
                <User
            key={user.id}
            name={user.name}
            email={user.email}
            id={user.id}>
            </User>
                <h1>projets</h1>
                {listProject}
            </div>
        </Layout>
    )
}

export default UserPage