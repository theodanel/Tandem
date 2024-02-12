import { Layout } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateProject = () => {
    const navigate = useNavigate();

    const [project, setProject] = useState({
        title: '',
        collaborators: '',
        description: '',
        languages: {
            HTML: false,
            CSS: false,
            JS: false,
            PYTHON: false,
            PHP: false
          },
        // image: '',
    });


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

    const handleSubmit = (e) => {
        e.preventDefault();
    
        navigate("/", { state: project });
    
      };

  return (

    <Layout>
            <div>Création de projet</div>

        <form onSubmit={handleSubmit} >
            <div>
                <label htmlFor='title'>Nom du projet:</label>
                <input type='text' id='title' name='title'  value={project.title} onChange={handleInput}/>
            </div>

            <div>
                <label for="collaborators">Nombre de participants (1-20):</label>
                <input type="number" id="collaborators" name="collaborators" min="1" max="20" value={project.collaborators} onChange={handleInput}/>
            </div>


            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description"  minLength="10" maxLength="100" size="10" 
                    value={project.description} onChange={handleInput}/>
            </div>

            <div>
                <label htmlFor="languages">Langages envisagés:</label>
                <legend name="languages" id="languages" value={project.languages} onChange={handleInput}></legend>

                <div>
                    <input type="checkbox" id="HTML" name="HTML" checked={project.languages.HTML} onChange={handleCheckBox}/>
                    <label for="HTML">HTML</label>
                </div>
                <div>
                    <input type="checkbox" id="CSS" name="CSS"  checked={project.languages.CSS} onChange={handleCheckBox}/>
                    <label for="CSS">CSS</label>
                </div>
                <div>
                    <input type="checkbox" id="JS" name="JS"  checked={project.languages.JS} onChange={handleCheckBox}/>
                    <label for="JS">JS</label>
                </div>
                <div>
                    <input type="checkbox" id="PYTHON" name="PYTHON"  checked={project.languages.PYTHON} onChange={handleCheckBox}/>
                    <label for="PYTHON">PYTHON</label>
                </div>
                <div>
                    <input type="checkbox" id="PHP" name="PHP"  checked={project.languages.PHP} onChange={handleCheckBox}/>
                    <label for="PHP">PHP</label>
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