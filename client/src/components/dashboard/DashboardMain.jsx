import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import ProductList from '../products/ProductList'; // Adjust this path as needed
//import Dash from './Dash';
import './dashboardMain.scss';

const DashboardMain = () => {
  return (
    <div className="dashboard-main">
   
      <div className="dashboard-grid">
      <div className="dashboard-item stats">
        <h3>Statistics</h3>
        {/* Add your statistics component here */}
      </div>
      <div className="dashboard-item activity">
        <h3>Produits les plus vendus</h3>
        {/* Add your recent activity component here */}
      </div>
      <div className="dashboard-item clients">
        <h3>Nouveaux clients</h3>
        {/* Add your sales chart component here */}
      </div>
      <div className="dashboard-item orders">
        <h3>Nouvelles commandes</h3>
        {/* Add your orders component here */}
      </div>
      <div className="dashboard-item messages">
        <h3>Messages</h3>
        {/* Add your messages component here */}
      </div>
    </div>
      
    </div>
  );
};

export default DashboardMain;
