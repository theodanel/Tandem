import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal } from "antd"
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout';
import Language from '../components/Language.js';


import "../stylesheets/ProjectDetail.scss"

const ShowProject = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState([]);
    const [project, setProject] = useState({});
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newCollaborators, setNewCollaborators] = useState("");
    const [languages, setLanguages] = useState([]);

    const navigate = useNavigate();

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

    const getProject = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/project/${id}`).then(res => res.data.project);
        setProject(response);
    };

    useEffect(() => {
        getProject();
    }, [])

    useEffect(() => {
        setNewTitle(project.title)
        setNewDescription(project.description)
        setNewCollaborators(project.collaborators)
    }, [project])


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const update = async (e) => {
        e.preventDefault();
        const res = await axios.put(`http://127.0.0.1:8000/api/project/${id}/update`, { newTitle, newDescription, newCollaborators });

        if (res.data.status === 200) {
            setNewTitle("");
            setNewDescription("");
            setNewCollaborators(0);
            setIsModalOpen(false);
            getProject();
            setErrors([]);
        } else {
            setErrors(res.data.errors);
        }
    }


    return (
        <Layout>
            <div className='projectDetail'>
                <div className='imagePosition'>
                    <img className='imageSize' src={project.image} alt="" />
                </div>

                {/* <div>NOMBRE DE COLLABORATEURS: {project.collaborators}</div> */}
                <div className='descriptionPosition'>
                    <div className='projectTitle'>
                        <div className='titleDecoration'>
                            <h1 id='projectTitle'>{project.title}</h1>
                            <hr className='titleDecoration'></hr>
                        </div>
                        <h4 id='creator'>Simtouflo_59 - ({project.created_at})</h4>
                    </div>

                    <p className='projectDescription'>{project.description}</p>

                    <h3>Langages utilisés :</h3>
                    <legend  name="languages" id="languages" value={project.languages}  required>
                        {languagesList}
                    </legend>
                    <hr className='languagesDecoration'></hr>

                        
                        
                 

                    <div>
                        <button onClick={() => showModal()}>Modifier</button>
                        <button onClick={() => navigate("/")}>Rejoindre le project</button>
                    </div>
                </div>
            </div>

            <Modal title="Modifier" open={isModalOpen} onCancel={handleCancel} footer={null} centered >
                <form onSubmit={(e) => update(e)}>
                    <input type='text' id='newTitle' name='newTitle' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <b>{errors.newTitle}</b>

                    <input type='text' id='newDescription' name='newDescription' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                    <b>{errors.newDescription}</b>

                    {/* <input type="number" id="newCollaborators" name="newCollaborators" min="1" max="20" value={newCollaborators} onChange={(e) => setNewCollaborators(e.target.value)} />
                    <b>{errors.newCollaborators}</b> */}

                    <button type='submit'>Valider</button>
                </form>
            </Modal>
        </Layout>
    )
}

export default ShowProject