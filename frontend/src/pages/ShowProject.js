import axios from '../api/axios';
import React, { Fragment, useEffect, useState } from 'react'
import { Collapse, Modal, Skeleton, Steps, message } from "antd"
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout';


import Language from '../components/Language.js';
import { PiTreeLight, PiPlantLight } from "react-icons/pi";
import { LuNut } from "react-icons/lu";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";



import "../stylesheets/ProjectDetail.scss"

import { useSelector } from 'react-redux';
import Comment from '../components/Comment.js';

const ShowProject = () => {
    const { id } = useParams();
    const loggedUser = useSelector(state=> state.data.user);
    const token = useSelector(state => state.data.token);
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    const [project, setProject] = useState({});
    const [updateProject, setUpdateProject] = useState({});
    const [status, setStatus] = useState("");
    const [allLanguages, setAllLanguages] = useState([]);
    const [postComment, setPostComment] = useState([]);
    const [checkedState, setCheckedState] = useState([]);

    /**
     * Mise à jour du state updateProject
     */
    const handleUpdate = (e) => {
        setUpdateProject({
            ...updateProject,
            [e.target.name]: e.target.value,
          });
    }

    /**
     * Gestion des skeleton antdesign
     */
    const [loading, setLoading] = useState(true);

    /**
     * Gestion des modales Antdesign
     */
    const [modals, setModals] = useState({
        steps: false,
        update: false,
    })

    const handleModals = (name, status) => {
        setModals({
            ...modals,
            [name] : status
        })
    }


    /**
     * Récupère le projet
     */
    const getProject = async () => {
        const res = await axios.get(`/api/project/${id}`);
        document.title = `${res.data.project.title}`;
        setProject(res.data.project);

        const languagesID = res.data.project.languages.map((language) => language.id);

        setUpdateProject({
            title : res.data.project.title,
            description : res.data.project.description,
            languages : languagesID,
            collaborators_max : res.data.project.collaborators_max,
        });

        setLoading(false);
    };


    /**
     *  Ajout / suppression d'un langage selon son état checked
     */
    const handleLanguage = (languageId) => {
       
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
            setUpdateProject({
            ...updateProject,
            languages: [...updateProject.languages, languageId],
            });
        } else {
            // si checked : false
            // Filtre le tableau project.languages pour retirer l'id du langage
            setUpdateProject({
            ...updateProject,
            languages: [...updateProject.languages.filter((id) => id !== languageId)],
            });
        }
    };


    /**
     * Récupère tous les langages
     */
    const getLanguages = async () => {
        const resLanguages = await axios("/api/languages").then(
            (res) => res.data.languages
        );
        setAllLanguages(resLanguages);
        const updatedCheckedState = resLanguages.map((language) =>
            project.languages.some((projectLanguage) => projectLanguage.id === language.id)
        );
        setCheckedState(updatedCheckedState);
    };


    const getData = async () => {
        const resProjects = await axios.get(`/api/projects/${id}`);
        setProject(resProjects.data.projects);
    };

    /**
     * Met à jour les données du projet
     */
    const update = async (e) => {
        e.preventDefault();
        const res = await axios.put(`/api/project/${id}/update`, updateProject, { headers: { "Authorization": `Bearer ${token}` } });
        
        if (res.data.status === 200) {
     
            handleModals("update", false)
            getProject({});
            setErrors([]);
            message.success("Commentaire ajouté !")
        } else {
            setErrors(res.data.errors);
        }
    };

    useEffect(() => {
        getProject();
    }, [id])


    /**
     * Change le statut du projet
     */
    const changeStatus = async (statusType) => {
        const res = await axios.put(`api/project/${id}/step`, { status: statusType }, { headers: { "Authorization": `Bearer ${token}` } })
        setStatus(project.status);
        getProject();
        message.success("Le projet a été mis à jour !")
    }



    const handleComment = (e) => {
        setPostComment({
            ...postComment,
            [e.target.name]: e.target.value
        })
    }


    /**
     * Ajoute un commentaire au projet
     */
    const postNewComment = async (e) => {
        e.preventDefault();
        const res = await axios.post(`/api/comment/${id}/store`, { comment: postComment.comment }, { headers: { "Authorization": `Bearer ${token}` } });
        if (res.data.status === 200) {
            setPostComment({comment : ""})
            message.success("Commentaire ajouté !")
        } else {
            setErrors(res.data.errors);
        }
        getProject();

    }


    /**
     * Génère les options pour 2 à 10 participants au projet
     */
    let participants = []
    for (let i = 2; i <= 10; i++) {
        participants.push(
            <option key={i} value={i}>{i}</option>
        )
    }

    /**
     * Liste des langages
     */
    const allLanguagesList = allLanguages.map((language, index) => (
        <Language
            key={language.id}
            name={language.name}
            checked={checkedState[index]}
            action={() => handleLanguage(language.id)}
            image={language.logo}
            type="checkbox"

        />
    ));


    /**
     * Affiche la liste des collaborateurs du projet
     */
    const collaboratorsList = project.collaboratorsList?.map((collaborator) => {
        return (
            <div className='collaboratorCard' key={collaborator.id}>
                <img src={`http://localhost:8000/images/avatars/${collaborator.avatar.url}`} />
                <h5>{collaborator.name}</h5>
            </div>
        );
    });

    /**
     * Affiche les commentaires du projet
     */
    const comments = project.comments?.map((comment) => {
        return (
            <Comment key={comment.id} 
                user={comment.user}
                date={comment.created_at}
                content={comment.content}
            />
        );
    });

    /**
     * Boutons de progression du projet
     */
    const stepOne = () => {
        return(
            <button name='created' className='btn-green active'> <LuNut size={25} className='stepsIcons'/>Projet créé</button>
        )
    }

    const stepTwo = () => {
        if(project.user_id === loggedUser?.id){
            if(project.status === "created"){
                return (
                    <button onClick={() => handleModals("steps", true)} name='ongoing' className='btn-green'><PiPlantLight size={25} className='stepsIcons'/>Démarrer le projet</button>
                )
            } else {
                return (
                    <button name='ongoing' className='btn-green active'><PiPlantLight size={25} className='stepsIcons'/>Projet démarré</button>
                )
            }
        } else if(project.status === "created"){
            return (
                <button name='ongoing' className='btn-green inactive'><PiPlantLight size={25} className='stepsIcons'/>Projet démarré</button>
            )
        } else{
            return (
                <button name='ongoing' className='btn-green active'><PiPlantLight size={25} className='stepsIcons'/>Projet démarré</button>
            )
        }
    }

    const stepThree = () => {
        if(project.user_id === loggedUser?.id){
            if(project.status === "created"){
                return (
                    <button className='btn-orange inactive'><PiTreeLight size={25} className='stepsIcons'/>Terminer le projet</button>
                )
            } else if (project.status === "ongoing") {
                return (
                    <button className='btn-orange' onClick={() => handleModals("steps", true)}><PiTreeLight size={25} className='stepsIcons'/>Terminer le projet</button>
                )
            } else {
                return (
                    <button className='btn-orange active'><PiTreeLight size={25} className='stepsIcons'/>Projet terminé !</button>
                )
            }
        } else if(project.status !== "completed"){
            return(
                <button className='btn-orange inactive'><PiTreeLight size={25} className='stepsIcons'/>Projet terminé !</button>
            )
        } else{
            return(
                <button onClick={() => handleModals("steps", true)} name='completed' className='btn-orange active'><PiTreeLight size={25} className='stepsIcons'/>Projet terminé !</button>
            )
        }
    }

    const statusIcon = () => {
        if (project.status === "ongoing"){
            return(
                <button name='ongoing' className='btn-green active'><PiPlantLight size={25} className='stepsIcons'/>Le projet est en cours</button>
            )
        } else if (project.status === "completed") {
            return(
                <button onClick={() => handleModals("steps", true)} name='completed' className='btn-orange active'><PiTreeLight size={25} className='stepsIcons'/>Le projet est terminé !</button>
            )
        } else{
            return(
                <button name='created' className='btn-green active'> <LuNut size={25} className='stepsIcons'/>Le projet n'a pas encore démarré</button>
            )
        }
    }


    ////////////
    //MODALS
    ////////////

    /**
     * Modale fu formulaire de modifiaction
     */
    const updateModal = () => {
        return(
            <Modal className='updateModal' title="Modifier" open={modals.update} onCancel={()=>handleModals("update", false)} footer={null} centered >
            <form onSubmit={(e)=>update(e)}>
                <div>
                    <label htmlFor='title'>Titre :</label>
                    <input type='text' id='title' name='title' value={updateProject.title} onChange={(e) => handleUpdate(e)} />
                    <strong>{errors.title}</strong>
                </div>

                <div>
                    <label htmlFor='description'>Description :</label>
                    <input type='text' id='description' name='description' value={updateProject.description} onChange={(e) => handleUpdate(e)} />
                    <strong>{errors.description}</strong>
                </div>

                <div>
                    <label>Nombre de collaborateurs max :</label>
                    <select id="collaborators_max" name="collaborators_max" min="1" max="20" value={updateProject?.collaborators_max || ""} onChange={(e) => handleUpdate(e)} required>
                        {participants}
                    </select>
                    <strong>{errors.collaborators_max}</strong>
                </div>

                <Collapse  onChange={() => {getLanguages();}} items={[
                        {
                            label: "Langages",
                            children: (
                                <div className="updateLanguagesList">{allLanguagesList}</div>
                            )
                        }]} />

                <button type="submit" className="btn-green center">Valider</button>
            </form>
        </Modal>
        )
    }

    /**
     * Modale de progression du projet
     */
    const stepsModal = () => {
        return(
            <Modal title="" open={modals.steps} onCancel={()=>handleModals("steps", false)} footer={null} centered >
                <h3>Etes vous sûr de vouloir passer à l'étape suivante ? </h3>
                <div className='flex center'>
                    <button type='button' onClick={() => (changeStatus(), handleModals("steps",false))} name='ongoing' className='btn-green'>Oui</button>
                    <button type='button' onClick={() => handleModals("steps",false)} name='closeModal' className='btn-red'>Non</button>
                </div>

            </Modal>
        )
    }


    return (
        <Layout>

            {/* Modals */}
            {updateModal()}
            {stepsModal()}

            
            <div className='projectDetail'>
                <div className='projectDetailPosition'>
                    <div className='imagePosition'>
                        <img className='imageSize' src={project.image} alt="" />
                    </div>

                    <div className='descriptionPosition'>
                        <div className='projectTitle'>
                            <div className='titleDecoration'>
                                <h1 id='projectTitle'>{project.title}</h1>
                                <hr className='titleDecoration'></hr>
                            </div>
                            <div className='creator'>
                                <h4 onClick={()=>navigate(`/user/${project.user_id}`)} >{project.creator?.name}</h4>
                                <h5> {project.created_at ? format(project.created_at, "dd/MM/yyyy") : ""}</h5>
                            </div>
                        </div>

                        <p className='projectDescription'>{project.description}</p>
                   

                        <div className='languagesList'>
                            <h3>Langages utilisés :</h3>
                            {project.languages && (
                                <legend name="languages" id="languages" value={project.languages} required>
                                    {project.languages.map(lang => (
                                        <Language
                                            key={lang.id}
                                            name={lang.name}
                                            image={lang.logo}
                                        />
                                    ))}
                                </legend>
                            )}
                            <hr className='languagesDecoration'></hr>
                        </div>

                        {project.user_id === loggedUser?.id ?
                        <Fragment>

                        <button className='btn-orange' onClick={() => handleModals("update",true)}>
                            <FaEdit />
                            Modifier
                        </button>

                        
                        <Steps  className='projectSteps' size="small" current={project.status === "created" ? 1 : project.status === "ongoing" ? 2 : 3 } id="Steps" items={[
                                    {
                                        title: stepOne(),
                                    },
                                    {
                                        title: stepTwo(),
                                    },
                                    {
                                        title: stepThree(),

                                    },
                                ]}/>
                                
                        </Fragment>
        
                           :
                           statusIcon()
                           }
                    </div>
                </div>

                <div className='collabList'>
                    <div id='collaborators'>
                        <h3>Collaborateurs ({project.collaborators}/{project.collaborators_max})</h3>
                        <hr className='languagesDecoration'></hr>
                        <ul>
                            <li>{collaboratorsList}</li>
                        </ul>

                    </div>
                </div>

                <div className='collabList'>
                    <div id='collaborators'>
                        <h3>Laisser un commentaire</h3>
                        <form className='addComment' onSubmit={(e) => postNewComment(e)}>
                            <textarea onChange={(e) => handleComment(e)} placeholder='Votre commentaire' name='comment' id='comment' value={postComment.comment} minLength="3" maxLength="500" required />
                            <button type='submit' className="btn-green" >Poster</button>
                        </form>
                        <strong>{errors.comment}</strong>
                        <hr className='languagesDecoration'></hr>

                        <h3>Commentaires</h3>
                        {comments}
                    </div>
                </div>
            </div>
    

        </Layout>
    )

}

export default ShowProject

