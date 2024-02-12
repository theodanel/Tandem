import React from 'react'

const Project = ({ name, image, profil , language , creator , description }) => {
  return (
    <div>
        <span>{name}</span>
        <img src={image} alt="" />
        <span>{description}</span>
        <span>{profil}</span>
        <span>{language}</span>
        <p>{creator}</p>
    </div>
  )
}

export default Project