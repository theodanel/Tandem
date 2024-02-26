import React from 'react'

const User = ({ name , avatar }) => {
  return (
    <div>
        <div>
            <img src={`http://localhost:8000/images/avatars/${avatar}`} />
        </div>
        <p>{name}</p>
    </div>
  )
}

export default User