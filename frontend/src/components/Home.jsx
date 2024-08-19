import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import Imageslider from './Imageslider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='header'>
                <div className='logoandbrand'>
                    <img className='logo' src='https://th.bing.com/th/id/OIP.-AW8qoORGV4gA74OJ7VtgAAAAA?rs=1&pid=ImgDetMain' alt='Logo' />
                    <p className='brand-name'>Pavan Food Caters</p>
                </div>
                <div className='nav-links'>
                    <Link to="/"><b>Home</b></Link>
                    <b><a href='#services'>Services</a></b>
                    <Link to="/orderdetailsform"><b>Order Items</b></Link>
                </div>
            </div>
            <div className='imageslider'>
                <Imageslider />
            </div>
            <h1>Our Services</h1>
            <div id="services"className='items'>
                <div className='item'>
                    <img className='itemimg' src="https://i.pinimg.com/originals/69/ca/8f/69ca8fdfceee5df980ecfce36b2aaf72.jpg" alt='Poornalu' />
                    <b>Poornalu</b>
                    <button className='order-button' onClick={() => { navigate("/orderdetailsform") }}>Order</button>
                </div>
                <div className='item'>
                    <img className='itemimg' src="https://www.indianhealthyrecipes.com/wp-content/uploads/2018/09/kudumulu-undrallu.jpg" alt='Undralu' />
                    <b>Undralu</b>
                    <button className='order-button' onClick={() => { navigate("/orderdetailsform") }}>Order</button>
                </div>
                <div className='item'>
                    <img className='itemimg' src="https://t4.ftcdn.net/jpg/05/07/96/53/360_F_507965361_vZNtYoglr9IyJkN4EpK9i4ydqOpSCYLc.jpg" alt='Pulihora' />
                    <b>Pulihora</b>
                    <button className='order-button' onClick={() => { navigate("/orderdetailsform") }}>Order</button>
                </div>
                <div className='item'>
                    <img className='itemimg' src="https://traditionallymodernfood.com/wp-content/uploads/2015/01/sweet-pongal-chakkarai-pongal-2-scaled.jpeg" alt='Chekari Pongal' />
                    <b>Chekari Pongal</b>
                    <button className='order-button' onClick={() => { navigate("/orderdetailsform") }}>Order</button>
                </div>
                <div className='item'>
                    <img className='itemimg' src="https://www.crazymasalafood.com/wp-content/images/Rava-Kesari-6-1.jpg" alt='Kesari' />
                    <b>Kesari</b>
                    <button className='order-button' onClick={() => { navigate("/orderdetailsform") }}>Order</button>
                </div>
                <div className='item'>
                    <img className='itemimg' src="https://i.ytimg.com/vi/aEhnKAAd-jI/maxresdefault.jpg" alt='Guggilu' />
                    <b>Guggilu</b>
                    <button className='order-button' onClick={() => { navigate("/orderdetailsform") }}>Order</button>
                </div>
            </div>
            <div className='footer'>
                <p>Contact Us</p>
                <p>PhonePe: +91 12345 67890</p>
                <p>GPay: +91 12345 67890</p>
                <p>Email: seller@example.com</p>
            </div>
        </div>
    );
}

export default Home;

