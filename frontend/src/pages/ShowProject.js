
import axios from '../api/axios';
import React, { Fragment, useEffect, useState } from 'react'
import { Collapse, Modal, Skeleton, Steps } from "antd"
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout';


import Language from '../components/Language.js';
import { PiTreeLight, PiPlantLight } from "react-icons/pi";
import { LuNut } from "react-icons/lu";
import { format } from "date-fns";


import "../stylesheets/ProjectDetail.scss"

import { useSelector } from 'react-redux';

const ShowProject = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState([]);
    const [project, setProject] = useState({});
    const [newTitle, setNewTitle] = useState("");
    const [status, setStatus] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [postComment, setPostComment] = useState([]);
    const [newCollaborators, setNewCollaborators] = useState("");
    const [loading, setLoading] = useState({
        user: true,
        languages: true,
    });
    const [allLanguages, setAllLanguages] = useState([]);


    const [checkedState, setCheckedState] = useState([]);

    const navigate = useNavigate();

    const token = useSelector(state => state.data.token);

    const getProject = async () => {
        const res = await axios.get(`/api/project/${id}`)
        Object.keys(res.data.project).map((key, index) => {
            setProject(project => ({ ...project, [key]: res.data.project[key] }));
        })
        document.title = `${res.data.project.title}`;
        setLoading(false);
    };



    // Ajout / suppression d'un langage selon son état checked
    const handleLanguage = (languageId) => {
        // Mise à jour de la valeur du checked du langage sélectionné (true devient false et vice versa)
        const updatedCheckedState = checkedState.map((item, index) =>
            // parcourt le tableau et ne change que le langage selectionné
            index === languageId - 1 ? !item : item
        );




        // Mise à jour du tableau checked avec cette nouvelle donnée
        setCheckedState(updatedCheckedState);

        // 2 actions possible selon l'état checked :
        if (updatedCheckedState[languageId - 1]) {
            // si checked : true
            // Ajout de l'id du langage dans le tableau project.languages
            setProject({
                ...project,
                languages: [...project.languages, languageId],
            });
        } else {
            // si checked : false
            // Filtre le tableau project.languages pour retirer l'id du langage
            setProject({
                ...project,
                languages: [...project.languages.filter((id) => id !== languageId)],
            });
        }
    };


    const getLanguages = async () => {
        
            const resLanguages = await axios("/api/languages").then(
                (res) => res.data.languages
            );
            setAllLanguages(resLanguages);
            // remplissage conditionnel tu tableau d'etat checked pour la liste des langages
            resLanguages.map((language) => {
                if (
                    project.languages.find(
                        (projectLanguage) => projectLanguage.id === language.id
                    )
                ) {
                    setCheckedState((checkedState) => [...checkedState, true]);
                } else {
                    setCheckedState((checkedState) => [...checkedState, false]);
                }
            });
        
    };


    const getData = async () => {
        const resProjects = await axios
            .get(`/api/projects/${id}`)
            .then((res) => res.data.projects);
        setProject(resProjects);


    }

    useEffect(() => {
        getData();
    }, []);


    const languagesList = project.languages?.map((language, index) => {
        return (
            <Language key={language.id} name={language.name} image={language.logo} />
        );
    });


    const allLanguagesList = allLanguages.map((language, index) => {
        return (
            <Language
                key={language.id}
                name={language.name}
                checked={checkedState[index]}
                action={() => handleLanguage(language.id)}
                image={language.logo}
                type="checkbox"
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
        setPostComment(project.comments)
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
        const res = await axios.put(`/api/project/${id}/update`, { newTitle, newDescription, newCollaborators }, { headers: { "Authorization": `Bearer ${token}` } });


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

    const changeStatus = async (statusType) => {
        const res = await axios.put(`api/project/${id}/step`, { status: statusType }, { headers: { "Authorization": `Bearer ${token}` } })

        setStatus(project.status)
        // if(project.status === "created") {
        //     setStatus(statusType)
        // } else {
        //     setErrors(res.data.errors);
        // }
    }

    // Permet d'afficher la liste des collaborateurs faisant partie d'un projet
    const collaboratorsList = project.collaboratorsList?.map((collaborator) => {
        return (
            <div className='collaboratorCard' key={collaborator.id}>
                <img src={`http://localhost:8000/images/avatars/${collaborator.avatar.url}`} />
                <h5>{collaborator.name}</h5>
            </div>
        );
    });

    const comments = project.comments?.map((comment) => {
        return (
            <div key={comment.id}>
                <p>{comment.content}</p>
            </div>
        );
    });



    const handleChange = (e) => {
        setPostComment({
            ...postComment,
            [e.target.name]: e.target.value
        })
    }


    const postComments = async () => {
        const res = await axios.post(`/api/comment/${id}/store`, { comment: postComment.comments }, { headers: { "Authorization": `Bearer ${token}` } });


        if (res.data.status === 200) {
            setPostComment(project.comments)
        } else {
            setErrors(res.data.errors);
        }

    }

    console.log(postComment);




    return (
        <Layout>


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
                                <h4 >{project.creator?.name}</h4>
                                <h5> {project.created_at ? format(project.created_at, "dd/MM/yyyy") : ""}</h5>
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

                                    description: <button style={{ 'backgroundColor': status === 'created' ? '#77DD79' : '#77dd79a9' }} onClick={() => showModalSteps()} name='ongoing' className='stepOne'>Démarrer le projet</button>, icon: <LuNut className='stepsIcons' />,

                                },
                                {
                                    description: <button style={{ 'backgroundColor': status != 'ongoing' ? '#77dd79a9' : '#77DD79' }} onClick={() => showModalSteps()} name='completed' className='stepTwo'>Projet en cours</button>, icon: <PiPlantLight className='stepsIcons' />,

                                },
                                {
                                    description: <button style={{ 'backgroundColor': status != 'completed' ? '#f47243b4' : '#f47243' }} className='stepThree'>Projet terminé</button>, icon: <PiTreeLight className='stepsIcons' />,

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
                            <textarea onChange={(e) => handleChange(e)} placeholder='Lorem ipsum dolor' name='comments' id='comments' />
                            <button type='button' className="commentButton" onClick={() => postComments()}>Poster</button>
                        </div>
                        <hr className='languagesDecoration'></hr>

                        <h3>Commentaires</h3>
                        {comments}
                    </div>
                </div>

            </div>



            <Modal title="" open={isModalStepsOpen} onCancel={handleCancel2} footer={null} centered >
                <h3>Etes vous sur de vouloir passer à l'étape suivante ? </h3>
                <button type='button' onClick={() => (changeStatus(), setIsModalStepsOpen(false))} name='ongoing' className='stepOne'>Oui</button>
                <button type='button' onClick={() => setIsModalStepsOpen(false)} name='closeModal' className='closeModal'>Non</button>

            </Modal>


            <Modal className='updateModal' title="Modifier" open={isModalOpen} onCancel={handleCancel} footer={null} centered >
                <form onSubmit={(e) => update(e)}>
                    <input type='text' id='newTitle' name='newTitle' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <b>{errors.newTitle}</b>

                    <input type='text' id='newDescription' name='newDescription' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                    <b>{errors.newDescription}</b>

                    <Collapse
                        onChange={() => {
                            getLanguages();
                        }}
                        items={[
                            {
                                label: "Langages",
                                children: (
                                    <Skeleton loading={loading.languages} active>
                                        <div className="updateLanguagesList">{allLanguagesList}</div>
                                    </Skeleton>
                                ),
                            },
                        ]}
                    />


                    <button type="submit" className="btn-green center" />
                </form>
            </Modal>

        </Layout>
    )

}

export default ShowProject