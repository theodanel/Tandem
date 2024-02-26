import React from 'react'
import "../stylesheets/UserIcon.scss"
import { useNavigate } from 'react-router'

const User = ({ name , avatar, id }) => {
  const navigate = useNavigate()
  return (
    <div className='user-display user-green' onClick={()=>navigate(`/user/${id}`)}>
        <div className='img'>
            <img src={`http://localhost:8000/images/avatars/${avatar}`} />
        </div>
        <p>{name}</p>
    </div>
  )
}

export default User