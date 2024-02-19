import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {Modal} from "antd"
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';

const ShowProject = () => {
    const {id} = useParams();
    const [errors, setErrors] = useState([]);
    const [project, setProject] = useState({});
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newCollaborators, setNewCollaborators] = useState("");
    const navigate = useNavigate();
    
    const token = useSelector(state => state.data.token);

    const getProject = async()=> {
        const response = await axios.get(`http://127.0.0.1:8000/api/project/${id}`).then(res=>res.data.project);
        setProject(response);
        document.title = `${response.title}`
    };

    useEffect(()=>{
        getProject();
    }, [])

    useEffect(()=>{
        setNewTitle(project.title)
        setNewDescription(project.description)
        setNewCollaborators(project.collaborators)
    },[project])


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
      };


    const update = async (e)=>{
        e.preventDefault();
        const res = await axios.put(`http://127.0.0.1:8000/api/project/${id}/update`, {newTitle, newDescription, newCollaborators},{headers:{"Authorization":`Bearer ${token}`}});

        if(res.data.status === 200){
            setNewTitle("");
            setNewDescription("");
            setNewCollaborators(0);
            setIsModalOpen(false);
            getProject();
            setErrors([]);
        } else {
            setErrors(res.data.errors);
        }
    }


  return (
    <Layout>
        <div><h1>[ID: {id}] Nom du projet: {project.title} </h1></div>
        <div>NOMBRE DE COLLABORATEURS: {project.collaborators}</div>
        <div> <h3>Descriptif du projet: {project.description}</h3></div>
        <button onClick={()=>showModal()}>Modifier</button>
        <img src={project.image} alt="" id='imgproject'/>
        <button onClick={() => navigate("/")}>Rejoindre le project</button>

                    <Modal title="Modifier" open={isModalOpen} onCancel={handleCancel} footer={null} centered >
                        <form onSubmit={(e)=>update(e)}>
                            <input type='text' id='newTitle' name='newTitle' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} />
                            <b>{errors.newTitle}</b>

                            <input type='text' id='newDescription' name='newDescription' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} />
                            <b>{errors.newDescription}</b>

                            <input type="number" id="newCollaborators" name="newCollaborators" min="1" max="20" value={newCollaborators} onChange={(e)=>setNewCollaborators(e.target.value)}/>
                            <b>{errors.newCollaborators}</b>

                            <button type='submit'>Valider</button>
                        </form>
                    </Modal>
    </Layout>
  )
}

export default ShowProject