import React, { useEffect } from 'react'
import axios from '../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { removeUser } from '../slices';
import swal from 'sweetalert';
import Layout from '../components/Layout';
import Home from './Home';
import { message } from 'antd';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.data.token);
    const user = useSelector(state => state.data.user);

    const logout = async () => {
        const res = await axios.post('/api/logout', {user},{headers:{"Authorization":`Bearer ${token}`}})
        if(res.data.status === "success"){
            // swal({
            //     title: "Au revoir !",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "OK"
            // })
            message.success(`Déconnexion réussie`)
   
            dispatch(removeUser(res.data));
            navigate('/');
        } else {
            swal({
                title: "Erreur",
                text: "Problème de déconnexion",
                icon: "error",
                button: "OK"
            });
            navigate('/');
        }
    }

    useEffect(()=>{
        console.log("test");
        if(!token || !user){
            navigate('/');
        } else {
            logout();
        }
    }, [])

    return(
            <Home/>
    )
}

export default Logout