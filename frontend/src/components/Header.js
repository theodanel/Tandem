
import '../stylesheets/style.css';

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthContext from '../context/AuthContext';
import axios from '../api/axios';


function Header() {
  // const {user, getUser} = useAuthContext();

  // useEffect(()=> {
  //   if(!user){
  //     getUser();
  //   }
  // }, []);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")) || null);

  // useEffect(()=> {
  //   if(!user && token){
  //     getUser();
  //   }
  // }, []);


  // const getUser = async () => {
  //   const {data} = await axios.get(`/api/user`, {headers:{"Authorization":`Bearer ${token}`}});
  //   setUser(data);
  // }

  const navigate = useNavigate();
  
  return (
    <header>
        <h1 onClick={()=>navigate('/')}>Tandem</h1>
        {user? 
        <p onClick={()=>navigate('/logout')}>{user.name}</p>
        :
        <p onClick={()=>navigate('/login')}>Connexion</p>
        } 
    </header>
  )
}

export default Header