import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Project from '../components/Project';
import Layout from '../components/Layout';
import User from '../components/User';
import Language from '../components/Language';
import "../stylesheets/UserDetail.scss";
import axios from '../api/axios.js';
import { Modal, Skeleton } from 'antd';

const UserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [languages, setLanguages] = useState([]);
    const [projectsList, setProjectsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getData = async () => {
        const data1 = await fetch("http://127.0.0.1:8000/api/languages").then(res => res.json());
        setLanguages(data1.languages);
        const data2 = await fetch("http://127.0.0.1:8000/api/projects").then(res => res.json());
        setProjectsList(data2.projects.filter(project=>project.user_id == id ).map(project => {
            return (
                <Project
                    key={project.id}
                    title={project.title}
                    name={project.name}
                    image={project.image}
                    status={project.status}
                    description={project.description}
                    profil={project.profil}
                    languages={project.languages}
                    creator_id={project.user_id}
                    collaborators={project.collaborators}
                    collaborators_max={project.collaborators_max}
                    id={project.id}
                    >
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

    const params = () => {
        return(
            <Modal title="Paramètres" open={isModalOpen} onCancel={()=>handleCancel()} footer={null} centered >
                <button type='button' onClick={()=>navigate('/logout')} >Déconnexion</button>
                <form>

                </form>
            </Modal>
        )
    }

    const friends =() => {
        return(
            <Modal title="Paramètres" open={isModalOpen} onCancel={()=>handleCancel()} footer={null} centered >
                <button type='button' onClick={()=>navigate('/logout')} >Déconnexion</button>
                <form>

                </form>
            </Modal>
        )
    }
      
    return (
        <Layout>
            <Skeleton  loading={loading} active>
            <div id='user'>
                <div className='profile'>
                    <button type='button' className='top-right-btn'>Ajouter</button>
                    <button type='button' className='top-right-btn' onClick={()=>setIsModalOpen(true)}>Paramètres</button>
                    <button type='button' className='bottom-left-btn' onClick={()=>setIsModalOpen(true)}>Contacts</button>
                    {params()}
                    <div id='user-avatar'>
                        <img src={`http://localhost:8000/images/avatars/${user.avatar}`} />
                    </div>
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
                    <h1>Projets crées</h1>
                    <div>
                        {projectsList}
                    </div>
                </div>
                <div id='user-project'>
                    <h1>Participation :</h1>
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