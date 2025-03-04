import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

const Progress = () => {
  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Contenido principal */}
      <div style={{ flex: 1, padding: '15px' }}>
        <h2>Progreso</h2>
        {/* Aquí irá el contenido de progreso */}
      </div>

      {/* Barra de navegación inferior */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1a1a1a',
        borderTop: '1px solid #333',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <Link to="/home" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>🏠</Link>
        <Link to="/search" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>🔍</Link>
        <Link to="/recetas" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>👨‍🍳</Link>
        <Link to="/progress" style={{ color: '#4CAF50', textDecoration: 'none', fontSize: '24px' }}>📈</Link>
      </nav>
    </div>
  );
};

export default Progress;
