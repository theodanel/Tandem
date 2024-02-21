import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios';
import Language from './Language';
import "../stylesheets/Project.scss";

const Project = ({ title, image, status , languages , creator_id , description, id }) => {
  const [creator, setCreator] = useState({})
  const navigate = useNavigate();
  const getCreator = async ()=>{
    const res = await axios.get(`/api/user/${creator_id}`);
    setCreator(res.data.user)
  }
  useEffect(()=>{
    getCreator();
  },[]);

  const languagesList = languages.map(language=>{
    return(
      <Language name={language.name} action={null} checked={null} image={language.logo} />
    )
  })

  return (
    <div className='project'>
      <div className='img'>
        <img onClick={() => navigate(`/project/${id}`)} src={image} alt="" id='project-img'/>
      </div>
      <div className='project-body'>
        <div>
          <div>
            <h3>{title}</h3>
            <p>{creator.name}</p>
          </div>
          <p className='description'>{description}</p>
        </div>
        <div className='languagesList-2'>{languagesList}</div>
      </div>
    </div>
  )
}

export default Project