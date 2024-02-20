import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios';
import Language from './Language';

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
        <img onClick={() => navigate(`/project/${id}`)} src={image} alt="" id='project-img'/>
        <div>
          <h3>{title}</h3>
          <p>{creator.name}</p>
        </div>
        <p>{description}</p>
        <div className='languagesList-2'>{languagesList}</div>
        

    </div>
  )
}

export default Project