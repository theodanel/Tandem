import React, { useState } from 'react'
import Layout from '../components/Layout';
import useAuthContext from '../context/AuthContext';

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const {login, errors} = useAuthContext();

    const handleLogin = async (e) =>{
        e.preventDefault();
        login({email, password});
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