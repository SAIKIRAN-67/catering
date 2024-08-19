// import { Route, Routes, useNavigate } from 'react-router-dom'
// import './App.css'
// import AdminDashboard from './components/AdminDashBoard'
// import OrderDetailsForm from './components/OrderDetailsForm'
// import AdminSignIn from './components/Admin/AdminSignIn'
// import GenerateReceipt from './components/Receipts/GenerateReceipt'
// import ProtectedRoute from './components/utils/ProtectedRoute'
// import OrderConfirmed from './components/Order/OrderConfirmed'
// import { useAuth } from './components/context/UserContext'
// import { useEffect } from 'react'



// function App() {

//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Is authenticated: ", isAuthenticated);
//     if (isAuthenticated === false) {
//       navigate('/admin-signin');
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<OrderDetailsForm />} />
//         {/* <Route path="/admin-signin" element={<AdminSignIn setIsAuthenticated={setIsAuthenticated} />} /> */}
//         <Route path='/generate-receipt' element={<GenerateReceipt />} />
//         <Route path="/order-confirmed" element={<OrderConfirmed />} />
//         <Route path="/admin-signin" element={<AdminSignIn />} />
//         {isAuthenticated ? <Route path="/admin-dashboard" element={<AdminDashboard />} /> : <Route path="/admin-signin" element={<AdminSignIn />} />}

//       </Routes>
//     </div>
//   )
// }

// export default App

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import AdminDashboard from './components/AdminDashBoard'
import OrderDetailsForm from './components/OrderDetailsForm'
import AdminSignIn from './components/Admin/AdminSignIn'
import GenerateReceipt from './components/Receipts/GenerateReceipt'
import OrderConfirmed from './components/Order/OrderConfirmed'
import { useAuth } from './components/context/UserContext'
import { useEffect } from 'react'
import Home from './components/Home'

function App() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const path = window.location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Path: ", path);
    console.log("Is authenticated: ", isAuthenticated);
    if (!loading && !isAuthenticated && (path === '/admin-dashboard' || path === '/admin-signin')) {
      navigate('/admin-signin');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/orderdetailsform" element={<OrderDetailsForm />} />
        <Route path="/generate-receipt" element={<GenerateReceipt />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="/admin-signin" element={<AdminSignIn />} />
        <Route path="/admin-dashboard" element={isAuthenticated ? <AdminDashboard /> : <AdminSignIn />} />
      </Routes>
    </div>
  );
}

export default App;

