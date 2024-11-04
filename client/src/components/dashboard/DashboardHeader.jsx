//DashboardHeader.jsx
import React, { useState } from 'react';
import {useAdminAuth} from '../../context/AdminContext';
import './dashboardHeader.scss';

export default function DashboardHeader({ username }) {

  return (
    <div className='dashboardHeader'>
      <h1>Tableau de bord</h1>
      <h3>Welcome {username} !</h3>
    </div>
  )
}

