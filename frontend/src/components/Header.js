import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  
  return (
    <header>
        <h1 onClick={()=>navigate('/')}>Tandem</h1>
        <p onClick={()=>navigate('/login')}>Connexion</p>
    </header>
  )
}

export default Header