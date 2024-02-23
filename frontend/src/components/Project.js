import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios';
import Language from './Language';
import { Modal, Popover, Progress } from 'antd';
import { PiPlantLight, PiTreeLight } from "react-icons/pi";
import { LuUser2, LuUsers2, LuNut } from "react-icons/lu";
import { IoBookmarkOutline, IoBookmark  } from "react-icons/io5";
import { FaHeart , FaRegHeart } from "react-icons/fa";
import "../stylesheets/Project.scss";



const Project = ({user, title, image, status , languages , creator_id , description, id, collaborators, collaborators_max, likes, favorites }) => {
  const [creator, setCreator] = useState({});
  const navigate = useNavigate();

  // Modale en cas de non-connexion pour les Likes/Favoris
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Récupère les données du créateur du projet
  const getCreator = async ()=>{
    const res = await axios.get(`/api/user/${creator_id}`);
    setCreator(res.data.user)
  }
  useEffect(()=>{
    getCreator();
  },[]);

  // Affichage de la liste des langages du projet
  const languagesList = languages.map((language, index)=>{
    return(
      <Language key={index} name={language.name} action={null} checked={null} image={language.logo} />
    )
  })

  // Couleurs pour le compteur de collaborateurs
  const colors = {
    '0%': '#2EC458',
    '50%': '#ADDDB2',
    // '60%': '#FFD7B4',
    '100%': '#F47143'
  }

  // Affichage des différentes icones selon l'avancement du projet
  const icon = () =>{
    switch(status){
      case("created"):
        return <Popover placement="right" content="Le projet n'a pas démarré !">
          <div className='icon nut' onClick={() => navigate(`/project/${id}`)} ><LuNut size={40} color='white'/></div>
          </Popover>;
      case("ongoing"):
        return <Popover placement="right" content="Projet en cours"><div className='icon plant' onClick={() => navigate(`/project/${id}`)} ><PiPlantLight size={40} color='white' /></div></Popover>
        case("completed"):
        return <Popover placement="right" content="Projet terminé !">
        <div className='icon tree' onClick={() => navigate(`/project/${id}`)}><PiTreeLight size={40} color='white' /></div></Popover>
    }
  }


  // Affichage de l'icone Favoris selon si le projet est un favori de l'utilisateur
  const favoris = () =>{
    // if (user?.favorites.find(favorite => favorite.project_id === id)){
    if (favorites?.find(favorite => favorite.user_id === user.id)){
      return (
        <Popover placement="left" content="Retirer des favoris">
          <div className='favorites' onClick={()=>handleAction("favorite")} ><IoBookmark className='action-icon' size={25} /></div>
        </Popover>
      )
    } else {
      return (
        <Popover placement="left" content="Ajouter aux favoris">
          <div className='favorites' onClick={()=>handleAction("favorite")}><IoBookmarkOutline className='action-icon' size={25} /></div>
        </Popover>
      )
    }
  }

  // Affichage de l'icone like selon si le projet est liké par l'utilisateur
  const like = () => {
      // if (user?.likes.find(like => like.project_id === id)){
      if (likes?.find(like => like.user_id === user.id)){
        return (
          <Popover placement="left" content="Retirer le like">
            <div className='likes' onClick={()=>handleAction("like")}><FaHeart className='action-icon' size={25} /></div>
          </Popover>
        )
      } else {
        return (
          <Popover placement="left" content="Liker le projet">
            <div className='likes' onClick={()=>handleAction("like")}><FaRegHeart className='action-icon' size={25} /></div>
          </Popover>
        )
      }
  }


  // Ajoute/Enlève un like/favori si l'utilisateur est connecté, sinon ouvre une modale
  const handleAction = async(action) => {
    if(user){
      axios.put(`/api/project/${id}/${action}`);
    } else {
      setIsModalOpen(true);
    }
  }

  return (
    <div className='project'>

      {icon()}

      <div className='user-actions'>
        {favoris()}
        {like()}
      </div>

      <div className='container'>

        <div className='project-img'>
          <img onClick={() => navigate(`/project/${id}`)} src={image} alt=""/>
        </div>

        <div className='project-body'>
          <div>
            <div>
              <h3 className='project-title' onClick={() => navigate(`/project/${id}`)}>{title}</h3>
              <div className='project-creator'>
                <div onClick={()=>navigate(`/user/${creator_id}`)}>
                  <LuUser2 className='user-icon'/>
                  <p>{creator.name}</p>
                </div>
              </div>
            </div>
            <p className='description' >{description.length>150?`${description.substring(0, 150)}...`: description}</p>
          </div>

          <div className='bottom-row'>
            <div className='languagesList-3'>
              {languagesList}
            </div>
            {/* {status !== "completed" ? */}
            <Popover placement="left" content={collaborators === collaborators_max ? "Equipe complète" : ` ${collaborators_max - collaborators} place(s) restante(s)`}>
              <div className='progress'>
              <LuUsers2 size={30} color={collaborators === collaborators_max ? '#F47143' : '#2EC458'} />
                <Progress className={collaborators === collaborators_max ? 'orange' : 'green'} type='circle' percent={(collaborators/collaborators_max)*100} size="small" format={(percent) => `${collaborators}/${collaborators_max}`} strokeColor={collaborators === collaborators_max ? '#F47143' : colors} />
              </div>
            </Popover>
            {/* : ""} */}
          </div>
        </div>
      </div>

      <Modal title="Connexion requise" open={isModalOpen} onCancel={()=>setIsModalOpen(false)} footer={null} centered >
        <h3>Veuillez vous connecter pour réaliser cette action</h3>
        <button type='button' onClick={() => navigate('/login')} >Me connecter</button>
        <button type='button' onClick={() => setIsModalOpen(false)}>Non merci</button>
      </Modal>
    </div>
  )
}

export default Project