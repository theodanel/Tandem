import React, { Fragment, useEffect, useState } from 'react'
import Layout from '../components/Layout';
// import useAuthContext from '../context/AuthContext';
import axios from '../api/axios';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../slices';
import { message } from 'antd';
import swal from 'sweetalert';

const Login = () => {
    useEffect(()=> {
        document.title = `Connexion`;
    }, []);
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
        // await axios.get('/sanctum/csrf-cookie');
        const res = await axios.post('/api/login', { email, password });
        if(res.data.status === 200){
            // swal({
            //     title: "Heureux de vous revoir !",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "OK"
            // })
            message.success(`Bienvenue, ${res.data.user.name} !`)
            dispatch(addUser(res.data));
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
        <Fragment>
            <form onSubmit={(e)=>handleLogin(e)}>
                <h1 className="title">Connexion</h1>
                <div className='form-group'>
                    <div className='flex-col'>
                        <label htmlFor='email'>Email :</label>
                        <input type='email' name='email' value={email} placeholder='tandem@email.fr' onChange={(e)=> setEmail(e.target.value)} autoFocus required />
                   
                    </div>
                    <div className='flex-col'>
                        <label htmlFor='password'>Mot de passe :</label>
                        <input type='password' name='password' value={password} placeholder='Mot de passe' onChange={(e)=> setPassword(e.target.value)} required />
                      
                    </div>
                </div>
                <button type='submit' className='btn-green-big'>Valider</button>
                <div className='flex'>
                    <p>Pas encore de compte ?</p>
                    <button type='button' className='btn-green' onClick={() => navigate('/register')}>S'inscrire</button>
                </div>
            </form>
        </Fragment>
    )
}

export default Login