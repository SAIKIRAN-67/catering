import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function ImageSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <Carousel {...settings}>
            <Wrap>
                <img src="https://wallpapercave.com/wp/wp3724272.jpg" alt='logos2' />
            </Wrap>
            <Wrap>
                <img src="https://www.foodlocale.in/wp-content/uploads/2023/01/fl_tm_food.jpg" alt='logos2' />
            </Wrap>
            <Wrap>
                <img src="https://chilping.com/wp-content/uploads/2023/10/Pulihora-Recipe-1.jpg" alt='logos3' />
            </Wrap>
        </Carousel>
    )
}

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <Arrow className={className} style={{ ...style, display: "block", right: "10px" }} onClick={onClick} />
    );
}

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <Arrow className={className} style={{ ...style, display: "block", left: "10px", zIndex: "1" }} onClick={onClick} />
    );
}

export default ImageSlider;

const Carousel = styled(Slider)`
    margin-top: 20px;
    ul li button {
        &:before {
            font-size: 10px;
            
        }
    }
    li.slick-active button:before {
        color: white;
    }
    .slick-list {
        overflow: hidden;
    }
    button {
        z-index: 1;
    }
`

const Wrap = styled.div`
    cursor: pointer;
    img {
        border: 4px solid transparent;
        border-radius: 4px;
        width: 100%;
        height: 400px;
        
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;    
        &:hover {
            border: 2px solid rgba(249, 249, 249, 0.8);
        }
    }
`

const Arrow = styled.div`
    background: none;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:before {
        content: '';
        border: solid white;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
    }
    &.slick-prev:before {
        transform: rotate(135deg);
    }
    &.slick-next:before {
        transform: rotate(-45deg);
    }
`
