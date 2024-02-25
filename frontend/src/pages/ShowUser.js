import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

import { Collapse, Modal, Popover, Skeleton, message } from 'antd';
import { format } from "date-fns";
import { FaGithub, FaDiscord, FaArrowLeft } from "react-icons/fa";
import { LuUserPlus2 } from "react-icons/lu";

import Project from '../components/Project';
import Layout from '../components/Layout';
import User from '../components/User';
import Language from '../components/Language';
import axios from '../api/axios.js';

import "../stylesheets/UserDetail.scss";
import { removeUser } from '../slices/index.js';


const UserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const loggedUser = useSelector(state => state.data.user) || {}
    const token = useSelector(state => state.data.token) || {}

    //===========
    //STATE
    //===========
    const [user, setUser] = useState({});
    const [updateUser, setUpdateUser] = useState({})
    const [allLanguages, setAllLanguages] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const [avatars, setAvatars] = useState([]);
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState({
        user:true,
        languages:true,
    });
    const [modals, setModals] = useState({
        params:false,
        contacts:false,
        languages:false,
        logout:false,
        avatars:false,
    });
    const [checkedState, setCheckedState] = useState([]);

     // Ajout / suppression d'un langage selon son état checked
     const handleLanguage = (languageId) => {
        // Mise à jour de la valeur du checked du langage sélectionné (true devient false et vice versa)
        const updatedCheckedState = checkedState.map((item, index) =>
            // parcourt le tableau et ne change que le langage selectionné
            index === languageId-1 ? !item : item
        );

        // Mise à jour du tableau checked avec cette nouvelle donnée
        setCheckedState(updatedCheckedState);

        // 2 actions possible selon l'état checked :
        if (updatedCheckedState[languageId-1]) { // si checked : true
            // Ajout de l'id du langage dans le tableau project.languages
            setUpdateUser({...updateUser, languages:[...updateUser.languages, languageId]});
        } else { // si checked : false
            // Filtre le tableau project.languages pour retirer l'id du langage
            setUpdateUser({...updateUser, languages:[...updateUser.languages.filter(id => id !== languageId)]});
        }
    };

    const handleModals = (name, status) =>{
        setModals({
            ...modals,
            [name]:status
        })
    }

    const handleLoading = (name, status)=>{
        setLoading({
            ...loading,
            [name]:status
        })
    }

    const handleUpdateUser = (e) =>{
        setUpdateUser({
            ...updateUser,
            [e.target.name] : e.target.value
        })
    }

    const handleAvatar = (value) =>{
        setUpdateUser({
            ...updateUser,
            avatar_id : value
        })
    }

    //===========
    //API CALLS
    //===========
    const getData = async () => {
        const resUser = await axios.get(`/api/user/${id}`).then(res => res.data.user);
        document.title = `${resUser.name}`;
        setUser(resUser);
        handleLoading("user",false)

        const resProjects = await axios.get(`/api/projects/${id}`).then(res => res.data.projects);
        setUserProjects(resProjects);

        const languagesID = resUser.languagesList.map(language => language.id)

        setUpdateUser({
            name: resUser.name,
            description: resUser.description,
            languages: languagesID,
            github: resUser.github,
            discord: resUser.discord,
            avatar_id: resUser.avatar_id
        })
        setDate(resUser.created_at);
    }


    const getLanguages = async() => {
        if(loading.languages){
            const resLanguages = await axios("/api/languages").then(res => res.data.languages);
            setAllLanguages(resLanguages);
            handleLoading("languages",false);
            // remplissage conditionnel tu tableau d'etat checked pour la liste des langages
            resLanguages.map(language=>{
                if(updateUser.languages.find(userLanguage => userLanguage === language.id )){
                    setCheckedState(checkedState => [...checkedState, true])
                } else {
                    setCheckedState(checkedState => [...checkedState, false])
                }
            })
        }
    }

    const getAvatars = async()=>{
        const resAvatars = await axios.get("/api/avatars")
        setAvatars(resAvatars.data.avatars);  
    }

    const handleAvatars = () => {
        if(loggedUser.id === user.id){
            getAvatars();
            handleModals('avatars',true);
        }
    }

    const updateAvatar = async()=>{
        await axios.put(`/api/user/${user.id}/update/avatar`, {"avatar":updateUser.avatar_id} , { "Content-Type": "application/json" , "Authorization":`Bearer ${token}`} )
        handleModals("avatars", false);
        message.success("Avatar mis à jour")
    }

    const handleForm = async (e)=>{
        e.preventDefault();
        const update = await axios.put(`/api/user/${id}/update`, updateUser, { "Content-Type": "application/json" , "Authorization":`Bearer ${token}`});
        if(update.data.status === 200){
            handleModals("params",false);
            message.success("Profil mis à jour")
        } else {
            message.error("Erreur")
        }
    }

    const handleLogout = async ()=>{
        const res = await axios.post(`/api/logout/${user.id}`,{headers:{"Authorization":`Bearer ${token}`}})
        if(res.data.status === 200){
            
            message.success(`Déconnexion réussie`)
            
            dispatch(removeUser(res.data));
        }
        navigate('/');
    }

    useEffect(() => {
        getData();
    }, [id, modals.avatars, modals.params])



    //===========
    //LISTS RENDERS
    //===========

    /**
     * Liste tous les avatars
     */
    const avatarsList = avatars.map((avatar, index) => {
        return (
            <div className="avatar" key={index} onClick={()=>handleAvatar(avatar.id)} name='avatar_id'>
                <label htmlFor={avatar.url}></label>
                <input 
                    type='radio'
                    id={avatar.url}
                    value={avatar.id}
                    checked={updateUser.avatar_id === avatar.id? true : false} 
                    onChange={()=>handleAvatar(avatar.id)}
                    name='avatar_id' />
                <img src={`http://localhost:8000/images/avatars/${avatar.url}`} alt={avatar.url} />
            </div>
        )
    })

    /**
     * Liste les projets créés par l'utilisateur
     */
    const createdProjects = userProjects.filter(project=>project.user_id == id).map(project=> {
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
    })

    /**
     * Liste les projets auxquels participe l'utilisateur
     */
    const projectsList = userProjects.map(project => {
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
    })

    /**
     * Liste les langages de l'utilisateur
     */
    const languagesList = user.languagesList?.map((language, index) => {
        return (
            <Language key={language.id}
            name={language.name}
            image={language.logo}
            />
        );
    });

    /**
     * Liste tous les langages
     */
    const allLanguagesList = allLanguages.map((language, index) => {
        return (
            <Language key={language.id}
                name={language.name}
                checked={checkedState[index]}
                action={() => handleLanguage(language.id)}
                image={language.logo}
                type='checkbox'
            />
        );
    });
    

    /**
     * Formulaire de mise à jour utilisateur
     */
    const updateForm = () => {
        return(
            <form onSubmit={(e)=>handleForm(e)} className='params'>
                <div className='flex-col'>
                    <label htmlFor='name'>Pseudo</label>
                    <input type='text' id='name' name='name' value={updateUser.name} onChange={(e)=>handleUpdateUser(e)} required max={54} min={3}/>
                </div>
                <div className='flex-col'>
                    <label htmlFor='description'>Description</label>
                    <textarea name='description' onChange={(e)=>handleUpdateUser(e)} value={updateUser.description} maxLength={500}></textarea>
                </div>
                <div className='form-group'>
                    <div className='flex-col'>
                        <label htmlFor='github'>Github</label>
                        <input type='text' id='github' name='github' value={updateUser.github} onChange={(e)=>handleUpdateUser(e)}/>
                    </div>
                    <div className='flex-col'>
                        <label htmlFor='discord'>Discord</label>
                        <input type='text' id='discord' name='discord' value={updateUser.discord} onChange={(e)=>handleUpdateUser(e)}/>
                    </div>
                </div>
                <Collapse onChange={()=>{getLanguages()}} items={[{label:"Langages", children:<Skeleton loading={loading.languages} active><div className='languagesList-3'>{allLanguagesList}</div></Skeleton>}]} />
                <button type='submit'>Valider</button>
            </form>
        )
    }


    //===========
    //MODALS
    //===========
    const paramsModal = () => {
        return(
            <Modal title="Paramètres du profil" open={modals.params} onCancel={()=>handleModals("params", false)} footer={null} centered >
                {updateForm()}
            </Modal>
        )
    }

    const contactsModal =() => {
        return(
            <Modal title={`Contacts de ${user.name}`} open={modals.contacts} onCancel={()=>handleModals("contacts", false)} footer={null} centered >
                
            </Modal>
        )
    }

    const logoutModal =() => {
        return(
            <Modal title={`Déconnexion`} open={modals.logout} onCancel={()=>handleModals("logout", false)} footer={null} centered >
                <p>Voulez-vous vous déconnecter ?</p>
                <button type='button' onClick={()=>handleLogout()}>Oui</button>
                <button type='button' onClick={()=>handleModals("logout", false)}>Non</button>
                
            </Modal>
        )
    }

    const avatarsModal =()=> {
        return(
            <Modal title={`Changer d'avatar`} open={modals.avatars} onCancel={()=>handleModals("avatars", false)} footer={null} centered>
                <div className='avatarsList'>
                    {avatarsList}
                </div>
                <button type='button' onClick={()=>updateAvatar()}>Valider</button>

            </Modal>
        )
    }

    return (
        <Layout>
            {/* Modals */}
            {paramsModal()}
            {contactsModal()}
            {logoutModal()}
            {avatarsModal()}
            
            <Skeleton  loading={loading.user} active>
            <div id='user'>
                <div className='user-profile'>
                        <FaArrowLeft size={25} className='top-left-btn' onClick={()=>navigate(-1)}/>
                        <div className='top-right-btn'>
                            {loggedUser?.id === user.id ? 
                                <Fragment>
                                    <button type='button'  onClick={()=>handleModals("params", true)}>Favoris
                                    </button>
                                    <button type='button' onClick={()=>handleModals("params", true)}>Paramètres
                                    </button>
                                    <button type='button' onClick={()=>handleModals("logout", true)} >Déconnexion</button>
                                </Fragment>
                                :
                                <button type='button' ><LuUserPlus2 />Ajouter</button>
                            }
                        </div>
                    <div className='profile'>
                        <div className={loggedUser?.id === user.id?'avatar img-hover':'avatar'} onClick={()=>handleAvatars()}>
                            <img src={`http://localhost:8000/images/avatars/${user.avatar}`} />
                            {loggedUser.id === user.id?
                            <p className='hidden'>Changer d'avatar</p>
                            :""}
                        </div>
                        <div className='links'>
                            {user.github?
                            <Popover placement="right" title="" content="Copié !" trigger="click">
                                <div className='github' onClick={() => {navigator.clipboard.writeText(user.github)}}>
                                    <FaGithub size={25}/>
                                    <p>{user.github}</p>
                                </div>
                            </Popover>
                            :""}
                            {user.discord?
                            <Popover placement="right" title="" content="Copié !" trigger="click">
                                <div className='discord' onClick={() => {navigator.clipboard.writeText(user.discord)}}>
                                    <FaDiscord size={25} className='discord-icon' />
                                    <p>{user.discord}</p>
                                </div>
                            </Popover>
                            :""}
                        </div>
                        <button type='button' className='contacts' onClick={()=>handleModals("contacts", true)}>Contacts</button>
                    </div>
                    <div className='description-profile'>         
                        <div className='user-description'>
                            <div id='user-name'>
                                <h1>{user.name}</h1>
                                <p className='date'>Membre depuis le : {date? format(date, "dd/MM/yyyy") : ""}</p>
                            </div>
                            {user.description? <p>{user.description}</p> : loggedUser?.id === user.id ? <p onClick={()=>handleModals('params', true)}>Ajouter une description</p> : ""}
                        </div>
                        <div id='user-languages'>
                            <h2>Langages connus :</h2>
                            {languagesList?.length>0 ? 
                                <div className='languagesList-profile'>{languagesList}</div> 
                            : loggedUser?.id === user.id ? 
                                <p onClick={()=>handleModals('params', true)}>Ajouter des langages</p> 
                            : 
                                <p className='blank'>L'utilisateur n'a indiqué aucun langage pour le moment.</p>
                            }
                        </div>
                    </div>
                </div>
                <div className='user-body'>
               
                    <div id='user-created'>
                        <h2>Projets créés :</h2>
                        {createdProjects?.length>0 ? 
                        <div className='projectsList'>
                            {createdProjects}
                        </div>
                        :
                        <p className='blank'>L'utilisateur n'a pas ecnore créé de projets.</p>
                        }
                    </div>
                    <div id='user-projects'>
                        <h2>Participation :</h2>
                        {projectsList?.length>0 ? 
                        <div className='projectsList'>
                            {projectsList}
                        </div>
                        :
                        <p className='blank'>L'utilisateur n'a participé à aucun projet pour le moment.</p>
                        }
                    </div>
                </div>
            </div>                
            </Skeleton>
        </Layout>
    )
}

export default UserPage