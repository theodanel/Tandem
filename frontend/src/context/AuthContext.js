import React, { createContext, useContext, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    /**
     * Créé un cookie CSRF pour empêcher les failles CSRF
     */
    const csrf = () => axios.get('/sanctum/csrf-cookie');

    /**
     * Récupère l'utilisateur connecté
     */
    const getUser = async () => {
        // const {data} = axios.get(`/api/user`);
        // setUser(data);
    }

    /**
     * Connecte un utilisateur enregistré
     */
    const login = async({ ...credentials }) => {
        await csrf();
        try{
            await axios.post('/login', { credentials });
            getUser();
            navigate('/');
        } catch(e) {
            console.log(e);
        }
    }

    /**
     * Inscrit un nouvel utilisateur et le connecte
     */
    const register = async({ ...credentials }) => {
        await csrf();
        try{
            await axios.post('/register', { credentials });
            getUser();
            navigate('/');
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <AuthContext.Provider value={{ user, errors, getUser, login, register }}>
            {children}
        </AuthContext.Provider>
    )
}


export default function useAuthContext(){
    return useContext(AuthContext);
}