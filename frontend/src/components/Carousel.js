import { Carousel as AntdCarousel } from 'antd';
import imgcarou from '../img/carou.jpg';
import imgcarou2 from '../img/carou2.jpg';
import imgcarou3 from '../img/carou3.jpg';


const Carousel = () => {

    // styles CSS pour le carrousel.
    const contentStyle = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
    };

    return (
        // Rapelle de l'import carousel d'antDesign renomer en AntdCarousel
        <AntdCarousel autoplay>
            <div>
                <h3 style={contentStyle}>
                {/* Rapelle de l'import de l'image dans le dossier img */}
                    <img src={imgcarou} />

                </h3>
            </div>
            <div>
                <h3 style={contentStyle}>
                    <img src={imgcarou2} />
                </h3>
            </div>
            <div>
                <h3 style={contentStyle}>
                    <img src={imgcarou3} />
                </h3>
            </div>

        </AntdCarousel>
    );
}

export default Carousel;