import React from 'react'

const User = ({ name , email }) => {
  return (
    <div>
        <span>{name}</span>
        <p>{email}</p>
    </div>
  )
}

export default User