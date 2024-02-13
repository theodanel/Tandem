import React, { useState } from 'react'
import { Layout, message } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'

const CreateProject = () => {
    const navigate = useNavigate();

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

    const handleCheckBox = (e) => {
        const { name, checked } = e.target;
        setProject(prevState => ({
            ...prevState,
            languages: {
              ...prevState.languages,
              [name]: checked
            }
          }));
        };


      const saveProject = async (e) => {
        e.preventDefault();

        const res = await axios.post(`http://127.0.0.1:8000/api/project/store`, project,{headers:{"Content-Type" : "application/json"}});

        if(res.data.status === 200){
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

        <form onSubmit={(e)=>saveProject(e)} >
            <div>
                <label htmlFor='title'>Nom du projet:</label>
                <input type='text' id='title' name='title'  value={project.title} onChange={handleInput}/>
                <b>{errors.title}</b>
            </div>

            <div>
                <label htmlFor="collaborators">Nombre de participants (1-20):</label>
                <input type="number" id="collaborators" name="collaborators" min="1" max="20" value={project.collaborators} onChange={(e)=>handleInput(e)}/>
                <b>{errors.collaborators}</b>
            </div>


            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description"  minLength="10" maxLength="1000" size="10" 
                    value={project.description} onChange={handleInput}/>
                    <b>{errors.description}</b>
            </div>

            <div>
                <label htmlFor="languages">Langages envisagés:</label>
                <legend name="languages" id="languages" value={project.languages} onChange={handleInput}></legend>
                <b>{errors.languages}</b>

                <div>
                    <input type="checkbox" id="HTML" name="HTML" checked={project.languages.HTML} onChange={handleCheckBox}/>
                    <label htmlFor="HTML">HTML</label>
                </div>
                <div>
                    <input type="checkbox" id="CSS" name="CSS"  checked={project.languages.CSS} onChange={handleCheckBox}/>
                    <label htmlFor="CSS">CSS</label>
                </div>
                <div>
                    <input type="checkbox" id="JS" name="JS"  checked={project.languages.JS} onChange={handleCheckBox}/>
                    <label htmlFor="JS">JS</label>
                </div>
                <div>
                    <input type="checkbox" id="PYTHON" name="PYTHON"  checked={project.languages.PYTHON} onChange={handleCheckBox}/>
                    <label htmlFor="PYTHON">PYTHON</label>
                </div>
                <div>
                    <input type="checkbox" id="PHP" name="PHP"  checked={project.languages.PHP} onChange={handleCheckBox}/>
                    <label htmlFor="PHP">PHP</label>
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