import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AsideBar from './AsideBar';
import DashboardHeader from './DashboardHeader';
import DashboardMain from './DashboardMain';
import ProductList from './ModalProduct';
import Dash from './Dash';
import Product from '../products/ProductItem';

import './dashboard.scss';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <DashboardHeader />
      <div className='dashboard-principal'>
        <AsideBar />
        <div className='dashboard-content'>
          <Routes>
            <Route path="/" element={ <DashboardMain />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product" element={<Product />} />
            <Route path="/dash" element={<Dash />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;