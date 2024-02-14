import React, { useState } from 'react'
import Layout from '../components/Layout';
// import useAuthContext from '../context/AuthContext';
import axios from '../api/axios';
import { useNavigate } from 'react-router';

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    // const {login, errors} = useAuthContext();
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        // login({email, password});
        await axios.get('/sanctum/csrf-cookie');
        const res = await axios.post('/api/login', { email, password });
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate('/');
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