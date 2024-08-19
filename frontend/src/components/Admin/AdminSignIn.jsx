import React, { useEffect, useState } from 'react';
import "./AdminSignIn.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import axios from 'axios';

const AdminSignIn = () => {
  const { login , url,isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (isAuthenticated) {
      navigate('/admin-dashboard');
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}api/admin/signin`, formData);
    console.log("response", response);
      if (response.status === 200) {
        alert("Successful Login");
        login(response.data.token); // Save the token and set isAuthenticated to true
        setFormData({ email: '', password: '' });
        navigate("/admin-dashboard");
      } else {
        alert(data.error || "Invalid Credentials");
        setFormData({ email: '', password: '' });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='admin-container-box'>
      <div className='admin-container'>
        <h1>Admin SignIn</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='admin-form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              onChange={handleChange}
              name='email'
              value={formData.email}
              className='form-control'
              placeholder='email'
              id='email'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              onChange={handleChange}
              name='password'
              value={formData.password}
              placeholder='password'
              className='form-control'
              id='password'
              required
            />
          </div>
          <button type='submit' className='admin-btn'>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;
