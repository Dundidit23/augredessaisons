//Dashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AsideBar from './AsideBar';
import DashboardHeader from './DashboardHeader';
import DashboardMain from './DashboardMain';
import ProductList from './ModalProduct';

import './dashboard.scss';

const Dashboard = () => {
  return (
    <>
    <div className='dashboard'>
      <DashboardHeader />
      <div className='dashboard-principal'>
        
        <AsideBar />
        <Routes>
            <Route path="/" element={ <DashboardMain />} />
            <Route path="/dashboard/products" element={<ProductList />} />
            {/* Add more routes as needed */}
          </Routes>
        <div className='dashboard-content'>
        
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;