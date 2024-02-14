import React, { useEffect, useState } from 'react'
import { Checkbox, Layout, message } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
import Language from '../components/Language';

const CreateProject = () => {
    const navigate = useNavigate();

    const [languages, setLanguages] = useState([]);

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    
    const [project, setProject] = useState({
        title: '',
        collaborators: 0,
        description: '',
        languages: {
            HTML: false,
            CSS: false,
            JS: false,
            PYTHON: false,
            PHP: false
        },
        user_id: 5,
        // image: '',
    });

    const [errors, setErrors] = useState([]);


    const handleInput = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    };



    const getLanguages = async () => {
        const data = await fetch("http://127.0.0.1:8000/api/languages").then(res => res.json());

                setLanguages(data.languages);
                console.log(data.languages)
            }

            useEffect(() => {
                getLanguages();
            }, []
            )


    const listLanguage = languages.map(language => {
        return (
            
            <Checkbox>
                <Language
                    key={language.id}
                    name={language.name}
                    category={language.category}
                    id={language.id}>
                </Language>
            </Checkbox>

        );

    });


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
                collaborators: '',
                description: '',
                languages: [],
            })
            message.success(res.data.message)
            setErrors([]);
            navigate('/', project);
        }
        message.error("Champ(s) invalide(s)")
        setErrors(res.data.errors);

    }





    return (

        <Layout>
            <div>Création de projet</div>

            <form onSubmit={(e) => saveProject(e)} >
                <div>
                    <label htmlFor='title'>Nom du projet:</label>
                    <input type='text' id='title' name='title' value={project.title} onChange={handleInput} />
                    <b>{errors.title}</b>
                </div>

                <div>
                    <label htmlFor="collaborators">Nombre de participants (1-20):</label>
                    <input type="number" id="collaborators" name="collaborators" min="1" max="20" value={project.collaborators} onChange={(e) => handleInput(e)} />
                    <b>{errors.collaborators}</b>
                </div>


                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" minLength="10" maxLength="1000" size="10"
                        value={project.description} onChange={handleInput} />
                    <b>{errors.description}</b>
                </div>

                <div>
                    <label htmlFor="languages">Langages envisagés:</label>
                    <legend name="languages" id="languages" value={project.languages} onChange={handleInput}></legend>
                    <b>{errors.languages}</b>

                    
                    {listLanguage}
                    


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