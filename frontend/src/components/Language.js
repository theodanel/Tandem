import React from 'react'
import { useNavigate } from 'react-router-dom'

// Déstructure les propriétés passées au composant. Le composant attend deux propriétés, name et category, qui sont extraites ici pour être utilisées directement.
const Language = ({name, category}) => {
  return (
    <div>
      {/*  Affiche le contenu de la propriété  */}
        <span>{name}</span>
        <span>{category}</span>
    </div>
  )
}

export default Language