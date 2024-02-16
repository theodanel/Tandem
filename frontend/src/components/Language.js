import React from 'react'

const Language = ({name, action, checked, image}) => {

  return (
    <div className='language'>
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={action}/>
        <div className='img' onClick={action}>
          <img src={image} htmlFor={name} alt={name}/>
        </div>
      <label htmlFor={name}>{name}</label>
    </div>
  )
}

export default Language