import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios';
import Language from './Language';
import { Popover, Progress } from 'antd';
import { FaUser } from "react-icons/fa";
import { PiPlantLight, PiTreeLight } from "react-icons/pi";
import { LuUser2, LuNut } from "react-icons/lu";
import "../stylesheets/Project.scss"



const Project = ({ title, image, status , languages , creator_id , description, id, collaborators, collaborators_max }) => {
  const [creator, setCreator] = useState({})
  const navigate = useNavigate();
  const getCreator = async ()=>{
    const res = await axios.get(`/api/user/${creator_id}`);
    setCreator(res.data.user)
  }
  useEffect(()=>{
    getCreator();
  },[]);

  const languagesList = languages.map((language, index)=>{
    return(
      <Language key={index} name={language.name} action={null} checked={null} image={language.logo} />
    )
  })

  const colors = {
    '0%': '#2EC458',
    '50%': '#ADDDB2',
    // '60%': '#FFD7B4',
    '100%': '#F47143'
  }

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

  return (
    <div className='project'>
      {icon()}
      <div className='container'>
        <div className='project-img'>
          <img onClick={() => navigate(`/project/${id}`)} src={image} alt=""/>
        </div>
        <div className='project-body'>
          <div>
            <div>
              <h3 className='project-title' onClick={() => navigate(`/project/${id}`)}>{title}</h3>
              <div className='project-creator'>
                <p onClick={()=>navigate(`/user/${creator_id}`)} >{creator.name}</p>
              </div>
            </div>
            <p className='description' >{description.length>150?`${description.substring(0, 150)}...`: description}</p>
          </div>
          <div className='bottom-row'>
            <div className='languagesList-3'>{languagesList}</div>
            {/* {status !== "completed" ? */}
              <Popover placement="left" content={collaborators === collaborators_max ? "Equipe complète" : ` ${collaborators_max - collaborators} place(s) restante(s)`}>
                <div className='progress'>
                <LuUser2 size={30} color={collaborators === collaborators_max ? '#F47143' : '#2EC458'} />
                  <Progress className={collaborators === collaborators_max ? 'orange' : 'green'} type='circle' percent={(collaborators/collaborators_max)*100} size="small" format={(percent) => `${collaborators}/${collaborators_max}`} strokeColor={collaborators === collaborators_max ? '#F47143' : colors} />
                </div>
              </Popover>
             {/* : ""} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project