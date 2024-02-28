import React from 'react'

const Language = ({type = "", name, action = null, checked, image}) => {

  return (
    <div className={`language ${type}`} onClick={action} title={name}>
        {type?
        <input
          type={type}
          id={name}
          name={name}
          checked={checked}
          onChange={action}/>
          :""}
        <div className='img' >
          <img src={image} alt={name}/>
        </div>
        {type?
        <p htmlFor={name}>{name}</p>
        : ""}
    </div>
  )
}

export default Language