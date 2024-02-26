import { Carousel as AntdCarousel, Popover, Progress } from 'antd';
import "../stylesheets/Carousel.scss";
import { useEffect, useState } from "react";
import Project from './Project';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { LuUser2 } from 'react-icons/lu';


const Carousel = ({ creator_id, collaborators, collaborators_max }) => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const getProjects = async () => {
        const res = await axios.get("/api/projects/coeur/all");
        console.log(res);
        setProjects(res.data.projects);
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
    const colors = {
        '0%': '#2EC458',
        '50%': '#ADDDB2',
        // '60%': '#FFD7B4',
        '100%': '#F47143'
    }

    return (
        // Rapelle de l'import carousel d'antDesign renomer en AntdCarousel
        <AntdCarousel className='caroussel' autoplay>
            {projects?.map((project, index) => (
                <div className='project-carousel' key={index}>
                <div className='contenair-carousel' onClick={() => navigate(`/project/${project.id}`)}>
                    <div className='container-carousel-img'>
                        <img src={project.image} alt="" id='project-img' />
                    </div>
                    <div className='container-carousel-body'>
                        <div className='titleCreator-carousel'>
                            <h2>{project.title}</h2>
                            <h5 className='creator-carousel'>{project.creator.name}</h5>
                        </div>
                        <div className='project-body-between'>

                            <div className='project-body project-body-carousel'>
                                <p className='description'>{project.description}</p>
                                <Popover placement="left" content={project.collaborators === project.collaborators_max ? "Equipe complète" : ` ${project.collaborators_max - project.collaborators} place(s) restante(s)`}>
                                    <div className='progress'>
                                        <LuUser2 size={30} color={project.collaborators === project.collaborators_max ? '#F47143' : '#2EC458'} />
                                        <Progress className={project.collaborators === project.collaborators_max ? 'orange' : 'green'} type='circle' percent={(project.collaborators / project.collaborators_max) * 100} size="small" format={(percent) => `${project.collaborators}/${project.collaborators_max}`} strokeColor={project.collaborators === project.collaborators_max ? '#F47143' : colors} />
                                    </div>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </AntdCarousel>
    );
}

export default Carousel;