import React, { useEffect, useState } from 'react'
import { Modal, message } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout';
import Language from '../components/Language.js';

import "../stylesheets/Language.scss"

const CreateProject = () => {
    const navigate = useNavigate();

    const [project, setProject] = useState({
        title: '',
        collaborators_max: 0,
        description: '',
        languages: [],
        user_id: 5,
        // image: '',
    });

    const [languages, setLanguages] = useState([]);
    const [checkedState, setCheckedState] = useState([]);
    const [errors, setErrors] = useState([]);

    // Gestion de la modale Ant Design
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };


    useEffect(() => {
        const getLanguages = async () => {
            const data = await fetch("http://127.0.0.1:8000/api/languages").then(res => res.json());

            setLanguages(data.languages);
            setCheckedState(new Array(data.languages.length).fill(false))
            console.log(data.languages)
        }
        getLanguages();
    }, []
    )


    const handleInput = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    };
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        const selectedLanguageId = languages[position].id;
        if (updatedCheckedState[position]) {
            setProject({...project, languages:[...project.languages, selectedLanguageId]});
        } else {
            setProject({...project, languages:[...project.languages.filter(id => id !== selectedLanguageId)]});
        }
    }

    const languagesList = languages.map((language, index) => {
        return (
            <Language key={language.id}
                name={language.name}
                checked={checkedState[index]}
                action={() => handleOnChange(index)}
                image={language.logo}
            />
        );
    });

    const selectedLanguages = languages.filter((language, index)=>project.languages.includes(language.id)).map((language, index) => {
        return (
            <Language key={language.id}
            name={language.name}
            checked={checkedState[index]}
            action={() => handleOnChange(index)}
            image={language.logo}
        />
        )
    })

    const saveProject = async (e) => {
        e.preventDefault();

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

    return (
        <Layout>
            <div>Création de projet</div>

            <form onSubmit={(e) => saveProject(e)} >
                <div>
                    <label htmlFor='title'>Nom du projet:</label>
                    <input type='text' id='title' name='title' value={project.title} onChange={handleInput} autoFocus required/>
                    <b>{errors.title}</b>
                </div>

                <div>
                    <label htmlFor="collaborators_max">Nombre de participants (1-20):</label>
                    <input type="number" id="collaborators_max" name="collaborators_max" min="1" max="20" value={project.collaborators_max} onChange={(e) => handleInput(e)} required />
                    <b>{errors.collaborators_max}</b>
                </div>


                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" minLength="10" maxLength="1000" size="10"
                        value={project.description} onChange={handleInput} required />
                    <b>{errors.description}</b>
                </div>

                <div>
                    <label htmlFor="languages">Langages envisagés:</label>
                    <legend name="languages" id="languages" value={project.languages} onChange={handleInput} required></legend>
                    <button onClick={()=>showModal()}>Selectionner</button>
                    <b>{errors.languages}</b>
                    
                    <Modal title="Choisir des langages" open={isModalOpen} onCancel={handleCancel} footer={null} centered>
                        <div className='languagesList'>
                            {languagesList}
                        </div>
                        <button onClick={()=>handleCancel()}>Valider</button>
                    </Modal>

                    <div className='languagesList-2'>
                        {selectedLanguages}
                    </div>

                </div>

                {/* <div>
                <label for="image">Image d'illustration:</label>
                <input type="file" id="image" name="image" accept="image/png, image/jpeg" value={project.title} onChange={handleInput}/>
            </div> */}


                <button type='submit'> Créer le projet</button>
            </form>

        </Layout>
    )

}
export default CreateProject