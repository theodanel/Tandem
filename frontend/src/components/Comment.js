import { formatDate } from 'date-fns'
import React from 'react'
import "../stylesheets/Comment.scss"
import { useNavigate } from 'react-router'

const Comment = ({user, name, date, content}) => {
    const navigate = useNavigate();
  return (
    <div className='commentItem'>
        <div className='commentImg' onClick={()=>navigate(`/user/${user.id}`)}>
            <img src={`http://localhost:8000/images/avatars/${user.avatar.url}`}/>
        </div>
        <div className='content'>
            <div className='userInfo'>
                <p onClick={()=>navigate(`/user/${user.id}`)}>{user.name}</p>
                <p>{formatDate(date, "dd/MM/yyyy - HH")}h{formatDate(date, "mm")}</p>
            </div>
            <p>{content}</p>
        </div>
    </div>
  )
}

export default Comment