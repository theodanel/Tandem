import { Carousel as AntdCarousel } from 'antd';
import "../stylesheets/Carousel.scss";
import { useEffect, useState } from "react";
import Project from './Project';
import { Navigate, useNavigate } from 'react-router-dom';


const Carousel = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate() ;
    const getProjects = async () => {
        const data = await fetch("http://127.0.0.1:8000/api/projects").then((res) => res.json()
        );

        setProjects(data.projects);
    };

    useEffect(() => {
        getProjects();
    }, []);
    // styles CSS pour le carrousel.
    const contentStyle = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        display: 'flex',
    };

    console.log(projects);
    const projectscarouel = projects.slice(0, 1).map(project => {
        return (
            <div className='project-carousel'>
                <div className='contenair-carousel' onClick={() => navigate(`/project/${project.id}`)}>
                    <div>
                        <img src={project.image} alt="" id='project-img' />
                    </div>
                    <div className='titleCreator-carousel'>
                        <h2>{project.title}</h2>
                        <h5 className='creator-carousel'>{project.creator.name}</h5>
                    </div>
                    <div className='project-body project-body-carousel'>
                        <p className='description'>{project.description}</p>
                    </div>

                </div>
            </div>
        );
    });

    return (

        // Rapelle de l'import carousel d'antDesign renomer en AntdCarousel
        <AntdCarousel className='caroussel' autoplay>
            {projects?.filter((element) => element.coeur).map((element) => (
                <div style={contentStyle}>
                    {projectscarouel}
                </div>
            ))}
        </AntdCarousel>
    );
}

export default Carousel;