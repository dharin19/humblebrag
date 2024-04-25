import React from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = ({ isActive }) => (
  isActive ? (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  ) : null
);

export default LoadingOverlay;
