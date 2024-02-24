
import axios from '../api/axios';
import React, {Fragment, useEffect, useState} from 'react'
import {Modal, Skeleton, Steps} from "antd"
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout';


import Language from '../components/Language.js';
import { PiTreeLight, PiPlantLight } from "react-icons/pi";
import { LuNut } from "react-icons/lu";


import "../stylesheets/ProjectDetail.scss"

import { useSelector } from 'react-redux';

const ShowProject = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState([]);
    const [project, setProject] = useState({});
    const [newTitle, setNewTitle] = useState("");
    const [status, setStatus] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newCollaborators, setNewCollaborators] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // const getLanguages = async () => {
    //     const data = await fetch("http://127.0.0.1:8000/api/languages").then(res => res.json());

    //     setLanguages(data.languages);
    // }

    // useEffect(() => {
    //     getLanguages();
    // }, []);

    const token = useSelector(state => state.data.token);

    const getProject = async()=> {
        const res = await axios.get(`/api/project/${id}`)
        Object.keys(res.data.project).map((key, index)=>{
            setProject(project => ({...project, [key]:res.data.project[key]}));
        })
        document.title = `${res.data.project.title}`;
        setLoading(false);
    };


    const languagesList = project.languages?.map((language) => {
        return (
            <Language key={language.id}
                name={language.name}
                image={language.logo}
            />
        );
    });


    useEffect(() => {
        getProject();
    }, [id])

    useEffect(() => {
        setNewTitle(project.title)
        setNewDescription(project.description)
        setNewCollaborators(project.collaborators)
        setStatus(project.status)
    }, [project])


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const [isModalStepsOpen, setIsModalStepsOpen] = useState(false);
    const showModalSteps = () => {
        setIsModalStepsOpen(true);
    };
    const handleCancel2 = () => {
        setIsModalStepsOpen(false);
    };


    const update = async (e) => {
        e.preventDefault();
        const res = await axios.put(`/api/project/${id}/update`, {newTitle, newDescription, newCollaborators},{headers:{"Authorization":`Bearer ${token}`}});

        
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

    const changeStatus = async(statusType) => {
        const res = await axios.put(`api/project/${id}/step`, {status: statusType} ,{headers:{"Authorization":`Bearer ${token}`}})

        setStatus(project.status)
        // if(project.status === "created") {
        //     setStatus(statusType)
        // } else {
        //     setErrors(res.data.errors);
        // }
    }

    // Permet d'afficher la liste des collaborateurs faisant partie d'un projet
    const collaboratorsList = project.collaboratorsList?.map((collaborator, index) => {
        return (
            <div className='collaboratorCard' key={collaborator.id}>
                <img src={`http://localhost:8000/images/avatars/${collaborator.avatar.url}`} />
                <h5>{collaborator.name}</h5>
            </div>
        );
    });

    return (
        <Layout>
            <Skeleton loading={loading} active>

           
            <div className='projectDetail'>
                <div className='projectDetailPosition'>
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
                            <div className='creator'>
                                <h4 >Simtouflo_59</h4>
                                <h5> - {project.created_at}</h5>
                            </div>
                        </div>
      

                        <p className='projectDescription'>{project.description}</p>

                        <div className='updateButton'>
                            <button onClick={() => showModal()}>Modifier</button>
                        </div>

                        <div className='languagesList'>
                            <h3>Langages utilisés :</h3>
                            <legend name="languages" id="languages" value={project.languages} required>
                                {languagesList}
                            </legend>
                            <hr className='languagesDecoration'></hr>
                        </div>
                    

                       
                            <Steps direction="vertical"
                                className='projectSteps'
                                size="small"
                                current={project.status}
                                id="Steps"
                                items={[
                                    {

                                        description: <button style={{'backgroundColor': status === 'created' ? '#77DD79' : '#77dd79a9' }} onClick={() => showModalSteps()} name='ongoing' className='stepOne'>Démarrer le projet</button>, icon: <LuNut />,

                                    },
                                    {
                                        description: <button style={{'backgroundColor': status != 'ongoing'  ? '#77dd79a9' : '#77DD79' }} onClick={() => showModalSteps()} name='completed' className='stepTwo'>Projet en cours</button>, icon: <PiPlantLight />,

                                    },
                                    {
                                        description: <button style={{'backgroundColor': status != 'completed' ?'#f47243b4' : '#f47243'}} className='stepThree'>Projet terminé</button>, icon: <PiTreeLight />,

                                    },
                                ]}
                            />

                        
                    </div>



                </div>

                <div className='collabList'>
                    <div id='collaborators'>
                        <h3>Collaborateurs</h3>
                        <hr className='languagesDecoration'></hr>
                        <ul>
                            <li>{collaboratorsList}</li>
                        </ul>

                    </div>
                </div>



                <div className='collabList'>
                    <div id='collaborators'>
                        <h3>Laisser un commentaire</h3>
                        <div className='addComment'>
                            <input type="text" placeholder='Lorem ipsum dolor' />
                            <button className="commentButton" onClick={() => showModal()}>Poster</button>
                        </div>
                        <hr className='languagesDecoration'></hr>

                        <h3>Commentaires</h3>
                    </div>
                </div>

            </div>



            <Modal title="" open={isModalStepsOpen} onCancel={handleCancel2} footer={null} centered >
                <h3>Etes vous sur de vouloir passer à l'étape suivante ? </h3>
                <button type='button' onClick={() => (changeStatus(), setIsModalStepsOpen(false))}  name='ongoing' className='stepOne'>Oui</button> <LuNut />
                <button type='button' onClick={() => setIsModalStepsOpen(false)}  name='closeModal' className='closeModal'>Non</button> <LuNut />
                
            </Modal>


            <Modal title="Modifier" open={isModalOpen} onCancel={handleCancel} footer={null} centered >
                <form onSubmit={(e) => update(e)}>
                    <input type='text' id='newTitle' name='newTitle' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <b>{errors.newTitle}</b>

                    <input type='text' id='newDescription' name='newDescription' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                    <b>{errors.newDescription}</b>

                    {/* <input type="number" id="newCollaborators" name="newCollaborators" min="1" max="20" value={newCollaborators} onChange={(e) => setNewCollaborators(e.target.value)} />
                    <b>{errors.newCollaborators}</b> */}

                    <input type='submit' value={"Valider"}/>
                </form>
            </Modal>
            </Skeleton>
        </Layout>
    )

}

export default ShowProject