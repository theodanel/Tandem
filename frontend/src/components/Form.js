import React from 'react'
import CreateProject from '../pages/CreateProject.js'
import Login from '../pages/Login.js';
import Register from '../pages/Register.js';
import '../stylesheets/Form.scss'
import Layout from './Layout.js';
import NotFound from '../pages/NotFound.js';

const Form = ({content}) => {
    const formContent = () => {
        switch (content){
            case 'newProject':
                return <CreateProject/>;
            case 'login':
                return <Login/>;
            case 'register':
                return <Register/>;
            case 'notFound':
                return <NotFound/>;
        }
    }
    return (
        <Layout>
            <section className='form'>
                {formContent()}
            </section>
        </Layout>
    )
}

export default Form