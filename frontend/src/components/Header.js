import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthContext from '../context/AuthContext';

function Header() {
  const {user, getUser} = useAuthContext();

  useEffect(()=> {
    if(!user){
      getUser();
    }
  }, []);
  const navigate = useNavigate();
  
  return (
    <header>
        <h1 onClick={()=>navigate('/')}>Tandem</h1>
        {user? 
        <p onClick={()=>navigate('/login')}>{user.name}</p>
        :
        <p onClick={()=>navigate('/login')}>Connexion</p>
        }
    </header>
  )
}

export default Header