import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
// import useAuthContext from '../context/AuthContext';
import axios from '../api/axios';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToken } from '../slices';
import { message } from 'antd';
import swal from 'sweetalert';

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const token = useSelector(state=> state.data.token);
    // const {login, errors} = useAuthContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        // login({email, password});
        await axios.get('/sanctum/csrf-cookie');
        const res = await axios.post('/api/login', { email, password });
        if(res.data.status === "success"){
            swal({
                title: "Bravo !",
                text: res.data.message,
                icon: "success",
                button: "OK"
            })
            dispatch(addUserToken(res.data.token));
            navigate('/');
        } else {
            message.error(res.data.message);
            setErrors(res.data.errors || []);
        } 
    }

    // Redirection automatique si utilisateur déjà connecté
    useEffect(() => {
        if (token) {
          navigate('/')
        }
      }, [])

    return (
        <Layout>
            <div>Login</div>
            <form onSubmit={(e)=>handleLogin(e)}>
                <div>
                    <label htmlFor='email'>Email :</label>
                    <input type='email' name='email' value={email} placeholder='Email' onChange={(e)=> setEmail(e.target.value)} required />
                    <b>{errors.email}</b>
                </div>
                <div>
                    <label htmlFor='password'>Mot de passe :</label>
                    <input type='password' name='password' value={password} placeholder='Mot de passe' onChange={(e)=> setPassword(e.target.value)} required />
                    <b>{errors.password}</b>
                </div>
                <button type='submit'>Valider</button>
            </form>
            <p>Pas encore de compte ?</p>
            <button onClick={() => navigate('/register')}>S'inscrire</button>
        </Layout>
    )
}

export default Login