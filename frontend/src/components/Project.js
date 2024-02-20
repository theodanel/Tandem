import React from 'react'
import { useNavigate } from 'react-router-dom'

const Project = ({ title, image, profil , language , creator , description, id }) => {
  const navigate = useNavigate();
  return (
    <div className='project'>
        <h6>{title}</h6>
        <img onClick={() => navigate(`/project/${id}`)} src={image} alt="" id='project-img'/>
        <h6>{description}</h6>
        <h6>{profil}</h6>
        <h6>{language}</h6>
        <h6>{creator}</h6>
    </div>
  )
}

export default Project