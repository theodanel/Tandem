import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from '../api/axios';
import { addUserToken } from '../slices';
import Layout from '../components/Layout';

const Register = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [newUser, setNewUser] = useState({
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        await axios.get('/sanctum/csrf-cookie');
        const res = await axios.post('/api/register', { newUser });
        dispatch(addUserToken(res.data.token));
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
            <p>Déjà inscrit ?</p>
            <button onClick={() => navigate('/login')}>Se connecter</button>
        </Layout>
    )
}

export default Register