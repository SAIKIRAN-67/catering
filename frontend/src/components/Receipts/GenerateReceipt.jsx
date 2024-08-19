import React, { useEffect, useState } from 'react';
import './GenerateReceipt.css';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const GenerateReceipt = () => {

  const location = useLocation();
  const { id } = location.state || {};

 useEffect(()=>{
  console.log("id : ",id);
 },[id])

  const handlePrint = () => {
    window.print();
  };

  // const handleExportToExcel = () => {
  //   const data = [
  //     { 'Name': name, 'Contact Number': contactNumber, 'Number of Packs': packs, 'Door Number': dNo, 'Street': street, 'Area': area, 'Price': price }
  //   ];
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Receipt');
  //   XLSX.writeFile(workbook, 'Receipt.xlsx');
  // };

  const [receipt, setReceipt] = useState({
    id:'',
    name: '',
    contactNumber: '',
    packs: '',
    dNo: '',
    street: '',
    area: '',
    price: ''
  });

  useEffect(() => {
    console.log("location : ", location);
    console.log("id : ", id);
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:1001/api/order/getorder/${id}`);
        console.log("res data : ", res.data.arr)
        setReceipt(res?.data.arr[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  },[id]);


  return (
    <div className="receipt-container">
      <h2 className="receipt-title">Receipt</h2>
      <div className="receipt-content">
      <div className="receipt-field">
          <span className="receipt-label">Id:</span>
          <span className="receipt-value">{id}</span>
        </div>
        <div className="receipt-field">
          <span className="receipt-label">Name:</span>
          <span className="receipt-value">{receipt.name}</span>
        </div>
        <div className="receipt-field">
          <span className="receipt-label">Contact Number:</span>
          <span className="receipt-value">{receipt.contactNumber}</span>
        </div>
        <div className="receipt-field">
          <span className="receipt-label">Number of Packs:</span>
          <span className="receipt-value">{receipt.packs}</span>
        </div>
        <div className="receipt-field">
          <span className="receipt-label">Door Number:</span>
          <span className="receipt-value">{receipt.dNo}</span>
        </div>
        <div className="receipt-field">
          <span className="receipt-label">Street:</span>
          <span className="receipt-value">{receipt.street}</span>
        </div>
        <div className="receipt-field">
          <span className="receipt-label">Area:</span>
          <span className="receipt-value">{receipt.area}</span>
        </div>
        <div className="receipt-field">
          <span className="receipt-label">Price:</span>
          <span className="receipt-value">₹{receipt.price}</span>
        </div>
        <button onClick={handlePrint} className="print-button">Print Receipt</button>
      </div>
    </div>
  );
};

export default GenerateReceipt;
