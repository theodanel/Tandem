import React from 'react'
import { useNavigate } from 'react-router-dom'

const Project = ({ title, image, profil , language , creator , description, id }) => {
  const navigate = useNavigate();
  return (
    <div className='project'>
        <span>{title}</span>
        <img onClick={() => navigate(`/project/${id}`)} src={image} alt="" />
        <span>{description}</span>
        <span>{profil}</span>
        <span>{language}</span>
        <p>{creator}</p>
    </div>
  )
}

export default Project