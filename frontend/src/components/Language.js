import React from 'react'

const Language = ({name, action, checked, image}) => {

  return (
    <div className='language' onClick={action}>
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={action}/>
        <div className='img' >
          <img src={image} alt={name}/>
        </div>
      <p htmlFor={name}>{name}</p>
    </div>
  )
}

export default Language