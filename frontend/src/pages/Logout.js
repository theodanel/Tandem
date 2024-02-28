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
        const res = await axios.post(`/api/logout/${user.id}`,{headers:{"Authorization":`Bearer ${token}`}})
        if(res.data.status === 200){
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
                text: res.data.message,
                icon: "error",
                button: "OK"
            });
            navigate('/');
        }
    }

    useEffect(()=>{
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