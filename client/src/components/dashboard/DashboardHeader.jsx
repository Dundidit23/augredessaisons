//DashboardHeader.jsx
import React, { useState } from 'react';
import {useAdminAuth} from '../../context/AdminAuthContext';
import './dashboardHeader.scss';

export default function DashboardHeader({ username }) {

  return (
    <div className='dashboardHeader'>
      <h1>Tableau de bord</h1>
      <h3>Bonjour  {username} !</h3>
    </div>
  )
}

