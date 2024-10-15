//Dashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AsideBar from '../src/components/dashboard/AsideBar';
import DashboardHeader from '../src/components/dashboard/DashboardHeader';
import DashboardAccueil from '../src/components/dashboard/DashboardAccueil';
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
            <Route path="/" element={ <DashboardAccueil />} />
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