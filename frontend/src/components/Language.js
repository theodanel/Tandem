import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

// Déstructure les propriétés passées au composant. Le composant attend deux propriétés, name et category, qui sont extraites ici pour être utilisées directement.
const Language = ({name, action, checked, image}) => {
  // const [image, setImage] = useState(`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`);

  // const getImage = async() => {
  //   const res = await axios.get()

  // }

  return (
    <div className='language'>
      <div>
        <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={action}/>
        <img src={image} htmlFor={name}/>
      </div>
      <label htmlFor={name}>{name}</label>
    </div>
  )
}

export default Language