import React from 'react'
import { useNavigate } from 'react-router-dom'

const Language = ({name, category}) => {
  return (
    <div>
        <span>{name}</span>
        <span>{category}</span>
    </div>
  )
}

export default Language