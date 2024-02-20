import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios';
import Language from './Language';

const Project = ({ title, image, profil , languages , creator_id , description, id }) => {
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
        <span>{title}</span>
        <img onClick={() => navigate(`/project/${id}`)} src={image} alt="" />
        <span>{description}</span>
        <span>{profil}</span>
        <div>{languagesList}</div>
        <p>{creator.name}</p>
    </div>
  )
}

export default Project