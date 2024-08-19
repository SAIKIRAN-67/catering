import React, { useEffect } from 'react';
import './OrderConfirmed.css'; // Make sure to create a CSS file for styling
import GenerateReceipt from '../Receipts/GenerateReceipt';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmed = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const { id } = location.state || {};

    useEffect(() =>{
        console.log("Serial Id : ", location);
        console.log("Serial Id : ", id);
    },[])

    const onGenerateReceiptHandler = () =>{
        navigate("/generate-receipt", {state: {id : id} })
    }


  return (
    <div className="order-confirmed-container">
      <div className="order-confirmed-card">
        <h2>Order Confirmed</h2>
        <p>Thank you for your order! Your order has been successfully placed.</p>
        <button onClick={() => navigate('/')} className="btn-home">
          Go to Home
        </button>
        <button className="btn-home" onClick={onGenerateReceiptHandler} >
            Generate Receipt
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmed;
