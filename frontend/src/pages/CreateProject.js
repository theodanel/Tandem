import React, { Fragment, useEffect, useState } from 'react'
import { Modal, message } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout';
import Language from '../components/Language.js';

import "../stylesheets/Language.scss"

const CreateProject = () => {
    const navigate = useNavigate();

    // State du projet qui récupère les données du formulaire
    const [project, setProject] = useState({
        title: '',
        collaborators_max: 0,
        description: '',
        languages: [],
        user_id: 5,
        // image: '',
    });

    // Liste de tous les langages dans la BDD, rempli via appel API
    const [languages, setLanguages] = useState([]);

    // Tableau de l'etat checked de toutes les checkbox, rempli après appel API des langages
    const [checkedState, setCheckedState] = useState([]);

    // Tableau des erreurs renvoyées par l'API après validation du formulaire
    const [errors, setErrors] = useState([]);

    // Gestion de la modale Ant Design
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };


    // Appel API pour la liste des langages
    const getLanguages = async () => {
        const data = await fetch("http://127.0.0.1:8000/api/languages").then(res => res.json());
        // Remplissage du tableau langages
        setLanguages(data.languages);
        // Remplissage du tableau checked en suivant le nombre de langages
        setCheckedState(new Array(data.languages.length).fill(false))
    }

    useEffect(() => {
        getLanguages();
    }, []);

    // Mise à jour du state project à chaque modification d'un champ du formulaire
    const handleInput = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    };

    // Ajout / suppression d'un langage selon son état checked
    const handleOnChange = (languageId) => {
        // Mise à jour de la valeur du checked du langage sélectionné (true devient false et vice versa)
        const updatedCheckedState = checkedState.map((item, index) =>
            // parcourt le tableau et ne change que le langage selectionné
            index === languageId-1 ? !item : item
        );

        // Mise à jour du tableau checked avec cette nouvelle donnée
        setCheckedState(updatedCheckedState);

        // 2 actions possible selon l'état checked :
        if (updatedCheckedState[languageId-1]) { // si checked : true
            // Ajout de l'id du langage dans le tableau project.languages
            setProject({...project, languages:[...project.languages, languageId]});
        } else { // si checked : false
            // Filtre le tableau project.languages pour retirer l'id du langage
            setProject({...project, languages:[...project.languages.filter(id => id !== languageId)]});
        }
    };

    // Création de la liste des langages
    const languagesList = languages.map((language, index) => {
        return (
            <Language key={language.id}
                name={language.name}
                checked={checkedState[index]}
                action={() => handleOnChange(language.id)}
                image={language.logo}
            />
        );
    });

    // Création de la liste des langages selectionnés
    const selectedLanguages = languages.filter((language, index)=>project.languages.includes(language.id)).map((language, index) => {
        return (
            <Language key={language.id}
            name={language.name}
            checked={checkedState[language.id-1]}
            action={() => handleOnChange(language.id)}
            image={language.logo}
        />
        )
    })

    // Enregistrement du projet
    const saveProject = async (e) => {
        e.preventDefault();

        // Appel à l'API
        const res = await axios.post(`http://127.0.0.1:8000/api/project/store`, project, { headers: { "Content-Type": "application/json" } });

        if (res.data.status === 200) {
            swal({
                title: "Bravo !",
                text: res.data.message,
                icon: "success",
                button: "OK"
            })
            setProject({
                title: '',
                collaborators_max: '',
                description: '',
                languages: [],
            })
            message.success(res.data.message)
            setErrors([]);
            navigate('/', project);
        } else {
            message.error("Champ(s) invalide(s)")
            setErrors(res.data.errors || []);
        }
    };

    let participants = []
    for(let i=2; i<=10; i++){
        participants.push(
            <option key={i} value={i}>{i}</option>
        )
    }

    return (
        <Fragment>
            <form onSubmit={(e) => saveProject(e)} >

            <h1>Création de projet</h1>
                <div className='form-group'>
                    <div className='flex-col'>
                        <label htmlFor='title'>Nom du projet :</label>
                        <input type='text' id='title' name='title' placeholder='Mon super projet' value={project.title} onChange={handleInput} autoFocus required/>
                        <b>{errors.title}</b>
                    </div>

                    <div >
                        <label htmlFor="collaborators_max">Nombre de participants :</label>
                        <select id="collaborators_max" name="collaborators_max" value={project.collaborators_max} onChange={(e) => handleInput(e)} required >
                            <option value={null}>Choisir</option>
                            {participants}
                        </select>
                        {/* <input type="number" id="collaborators_max" name="collaborators_max" min="1" max="20" value={project.collaborators_max} onChange={(e) => handleInput(e)} required /> */}
                        <b>{errors.collaborators_max}</b>
                    </div>
                </div>

                <div className='flex-col'>
                    <label htmlFor="description">Description du projet :</label>
                    <textarea type="text" id="description" name="description" minLength="10" maxLength="1000" placeholder='Une jolie description' size="10"
                        value={project.description} onChange={handleInput} required />
                    <b>{errors.description}</b>
                </div>

                <div className='form-group'>
                    <div>
                        <label for="image">Image d'illustration :</label>
                        <input type="file" id="image" name="image" accept="image/png, image/jpeg" value={project.title} onChange={handleInput}/>
                    </div>
                    <div>
                        <label htmlFor="languages">Langages envisagés:</label>
                        {/* <legend name="languages" id="languages" value={project.languages} onChange={handleInput} required></legend> */}
                        <button onClick={()=>showModal()}>Selectionner</button>
                        <b>{errors.languages}</b>
                        
                        <Modal title="Choisir des langages" open={isModalOpen} width="fit-content" onCancel={handleCancel} footer={null} centered>
                            <div className='languagesList'>
                                {languagesList}
                            </div>
                            <button onClick={()=>handleCancel()}>Valider</button>
                        </Modal>

                      

                    </div>

                 
                </div>
                <div className='languagesList-2'>
                    {selectedLanguages}
                </div>

                <button type='submit'> Créer le projet</button>
            </form>

        </Fragment>
    )

}
export default CreateProject