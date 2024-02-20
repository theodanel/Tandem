import { Carousel as AntdCarousel } from 'antd';
import "../stylesheets/Carousel.scss";
import { useEffect, useState } from "react";


const Carousel = () => {
    const [projects, setProjects] = useState([]);

    const getProjects = async () => {
        const data = await fetch("http://127.0.0.1:8000/api/projects").then((res) =>
            res.json()
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
    

    return (

        // Rapelle de l'import carousel d'antDesign renomer en AntdCarousel
        <AntdCarousel className='caroussel' autoplay>
                {projects?.filter((element) => element.coeur).map((element) => (
                    <div style={contentStyle}>
                        
                        <img src={element.image} id='carousel-img' />
                        <h2>{element.title}</h2>
                        <p id='carousel-description'>{element.description}</p>
                    </div>
                ))}
        </AntdCarousel>
    );
}

export default Carousel;