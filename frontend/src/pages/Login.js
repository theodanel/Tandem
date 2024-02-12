import React, { useState } from 'react'
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios";

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/login', {email, password});
            setEmail("");
            setPassword("");
            navigate('/');
        } catch(e) {
            console.log(e);
        }

    }

    return (
        <Layout>
            <div>Login</div>
            <form onSubmit={(e)=>handleLogin(e)}>
                <div>
                    <label htmlFor='email'>Email :</label>
                    <input type='email' name='email' value={email} placeholder='Email' onChange={(e)=> setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor='password'>Mot de passe :</label>
                    <input type='password' name='password' value={password} placeholder='Mot de passe' onChange={(e)=> setPassword(e.target.value)} required/>
                </div>
                <button type='submit'>Valider</button>
            </form>
        </Layout>
    )
}

export default Login