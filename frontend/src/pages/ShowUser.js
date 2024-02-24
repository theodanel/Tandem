import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

import { Collapse, Modal, Popover, Skeleton } from 'antd';
import { format } from "date-fns";
import { FaGithub, FaDiscord, FaArrowLeft } from "react-icons/fa";
import { LuUserPlus2 } from "react-icons/lu";

import Project from '../components/Project';
import Layout from '../components/Layout';
import User from '../components/User';
import Language from '../components/Language';
import axios from '../api/axios.js';

import "../stylesheets/UserDetail.scss";


const UserPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const loggedUser = useSelector(state => state.data.user)

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

        setUpdateUser({
            name: resUser.name,
            description: resUser.description,
            languages: resUser.languagesList,
            github: resUser.github,
            discord: resUser.discord
        })
        setDate(resUser.created_at);
    }

    useEffect(() => {
        getData();
    }, [id])

    const getLanguages = async() => {
        if(loading.languages){
            const resLanguages = await axios("/api/languages").then(res => res.data.languages);
            setAllLanguages(resLanguages);
            handleLoading("languages",false)
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

    //===========
    //LISTS RENDERS
    //===========
    const avatarsList = avatars.map((avatar, index) => {
        return (
            <div className='avatar' key={index}>
                <img src={`http://localhost:8000/images/avatars/${avatar.url}`} />
            </div>
        )
    })

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

    const languagesList = user.languagesList?.map((language, index) => {
        return (
            <Language key={language.id}
            name={language.name}
            image={language.logo}
            />
        );
    });

    const allLanguagesList = allLanguages.map((language, index) => {
        return (
            <Language key={language.id}
                name={language.name}
                // checked={checkedState[index]}
                // action={() => handleOnChange(language.id)}
                image={language.logo}
                type='checkbox'
            />
        );
    });
    
    const updateForm = () => {
        return(
            <form>
                <div className='flex-col'>
                    <label>Pseudo</label>
                    <input type='text' value={updateUser.name}/>
                </div>
                <div className='flex-col'>
                    <label>Description</label>
                    <textarea>{updateUser.description}</textarea>
                </div>
                <div className='form-group'>
                    <div className='flex-col'>
                        <label>Github</label>
                        <input type='text' value={updateUser.github}/>
                    </div>
                    <div className='flex-col'>
                        <label>Discord</label>
                        <input type='text' value={updateUser.discord}/>
                    </div>
                </div>
                <Collapse onChange={()=>{getLanguages()}} items={[{label:"Langages", children:<Skeleton loading={loading.languages} active>{allLanguagesList}</Skeleton>}]} />
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
                <button type='button' onClick={()=>navigate('/logout')}>Oui</button>
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

            </Modal>
        )
    }

    return (
        <Layout>
            <Skeleton  loading={loading.user} active>
            <div id='user'>
                <div className='profile'>
                    <FaArrowLeft size={25} className='top-left-btn' onClick={()=>navigate(-1)}/>
                    {loggedUser?.id === user.id ? 
                        <div className='top-right-btn'>
                            <button type='button'  onClick={()=>handleModals("params", true)}>Favoris
                            </button>
                            <button type='button' onClick={()=>handleModals("params", true)}>Paramètres
                            </button>
                            <button type='button' onClick={()=>handleModals("logout", true)} >Déconnexion</button>
                        </div>
                    :
                        <button type='button' className='top-right-btn'><LuUserPlus2 />Ajouter</button>
                    }
                    <button type='button' className='contacts' onClick={()=>handleModals("contacts", true)}>Contacts</button>

                    {/* Modals */}
                    {paramsModal()}
                    {contactsModal()}
                    {logoutModal()}
                    {avatarsModal()}

                    <div className={loggedUser.id === user.id?'avatar img-hover':'avatar'} onClick={()=>handleAvatars()}>
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
                </div>
                <div className='user-description'>
                    <div id='user-name'>
                        <h1>{user.name}</h1>
                        <p>Membre depuis le : {date? format(date, "dd/MM/yyyy") : ""}</p>
                    </div>
                    {user.description? <p>{user.description}</p> : loggedUser.id === user.id ? <p onClick={()=>handleModals('params', true)}>Ajouter une description</p> : ""}
                </div>
                <div id='user-language'>
                    <h2>Langages connus</h2>
                    {languagesList?.length>0 ? languagesList : loggedUser.id === user.id ? <p onClick={()=>handleModals('params', true)}>Ajouter des langages</p> : <p>L'utilisateur n'a indiqué aucun langage pour le moment</p>}
                </div>
                <div id='user-project'>
                    <h2>Projets créés</h2>
                    <div className='projectsList'>
                        {createdProjects}
                    </div>
                </div>
                <div id='user-project'>
                    <h2>Participation :</h2>
                    <div className='projectsList'>
                        {projectsList}
                    </div>
                </div>
            </div>                
            </Skeleton>
        </Layout>
    )
}

export default UserPage