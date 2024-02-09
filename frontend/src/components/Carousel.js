import { Carousel as AntdCarousel } from 'antd';

const Carousel = () => {

    const contentStyle = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
    };

    return (
        <AntdCarousel autoplay>
            <div>
                <h3 style={contentStyle}>1</h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>
        </AntdCarousel>
    );
}

export default Carousel;