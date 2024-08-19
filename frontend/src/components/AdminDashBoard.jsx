import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./AdminDashboard.css";
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useAuth } from './context/UserContext';

const AdminDashboard = () => {

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterArea, setFilterArea] = useState('');
  const [searchId, setSearchId] = useState('');
  const [areas, setAreas] = useState([]);
  const navigate = useNavigate();
  const { url, isAuthenticated, setIsAuthenticated } = useAuth();

  // Fetch all orders from the database
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(url + 'api/order/getallorders');
        setOrders(res?.data.arr);
        setFilteredOrders(res?.data.arr); // Initialize filteredOrders with all orders
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [url]);

  // Fetch unique areas from the backend
  useEffect(() => {
    const fetchUniqueAreas = async () => {
      try {
        const res = await axios.get(url + 'api/order/getuniqueareas');
        setAreas(res?.data.arr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUniqueAreas();
  }, [url]);

  // Filter orders based on selected area and search ID whenever they change
  useEffect(() => {
    const filterOrders = () => {
      const filtered = orders.filter(order => {
        const matchesArea = filterArea ? order.area.toLowerCase() === filterArea.toLowerCase() : true;
        const matchesId = searchId ? order.id.toString().includes(searchId) : true;
        return matchesArea && matchesId;
      });
      setFilteredOrders(filtered);
    };

    filterOrders();
  }, [filterArea, searchId, orders]);

  const handleAreaChange = (e) => {
    setFilterArea(e.target.value);
  };

  const handleSearchIdChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleClearSearch = () => {
    setFilterArea('');
    setSearchId('');
    setFilteredOrders(orders); // Reset to show all orders
  };

  const generateReceiptHandler = (id) => {
    navigate('/generate-receipt', { state: { id } });
  };

  const exportToExcel = () => {
    const formattedOrders = orders.map(order => ({
      Id: order.id,
      Name: order.name,
      ContactNumber: order.contactNumber,
      DoorNumber: order.dNo,
      Street: order.street,
      Area: order.area,
      Packs: order.packs,
      Price: order.price,
      PaymentStatus: order.paymentStatus === null ? "Paid" : "Not Paid",
      DeliveryStatus: order.deliveryStatus === null ? "Delivered" : "Pending",
      UtrRef: order.utrRef,
      UtrImg: order.utrImg
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const headers = [
      "Id",
      "Name",
      "Contact Number",
      "Door Number",
      "Street",
      "Area",
      "Packs",
      "Price",
      "Payment Status",
      "Delivery Status",
      "Utr Ref",
      "Utr Img"
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

    XLSX.writeFile(workbook, 'orders.xlsx');
  };

  const logOut = () => {
    setIsAuthenticated(!isAuthenticated);
    localStorage.removeItem('token');
    navigate("/admin-signin");
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-card">
        <div className="admin-dashboard-card-body">
          <div className="admin-dashboard-header">
            <h2 className="admin-dashboard-text-center">Admin Dashboard</h2>
            <div className="admin-dashboard-filter-container">
              <input
                type="text"
                placeholder="Search by ID"
                value={searchId}
                onChange={handleSearchIdChange}
                className="admin-dashboard-input"
              />
              <select
                value={filterArea}
                onChange={handleAreaChange}
                className="admin-dashboard-select"
              >
                <option value="">Filter by Area</option>
                {areas.map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <button onClick={handleClearSearch} className="admin-dashboard-btn btn-secondary">
                Clear
              </button>
              <button onClick={exportToExcel} className="admin-dashboard-btn btn-success">
                Export to Excel
              </button>
              <button onClick={logOut} className='logout'>Log Out</button>
            </div>
          </div>
          <table cellPadding={15} border={2} cellSpacing={0} className="admin-dashboard-table">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Packs</th>
                <th>Price</th>
                <th>Payment Status</th>
                <th>Delivery Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.dNo},{order.street},{order.area}</td>
                  <td>{order.contactNumber}</td>
                  <td>{order.packs}</td>
                  <td>{order.price}</td>
                  <td>{order.paymentStatus === null ? "Paid" : "Not Paid"}</td>
                  <td>{order.deliveryStatus === null ? "Delivered" : "Pending"}</td>
                  <td className='admin-dashboard-tbody-btn'>
                    <button onClick={() => generateReceiptHandler(order.id)} className="admin-dashboard-btn btn-success">
                      Generate Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

