import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

const Search = () => {
  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Barra superior */}
      <div style={{
        padding: '10px 15px',
        borderBottom: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          flex: 1,
          backgroundColor: '#333',
          borderRadius: '20px',
          padding: '8px 15px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Buscar..."
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              width: '100%',
              outline: 'none'
            }}
          />
        </div>
        <button style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '20px',
          padding: '5px'
        }}>
          ⌛
        </button>
        <button style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '20px',
          padding: '5px'
        }}>
          ❤️
        </button>
      </div>

      {/* Contenido principal */}
      <div style={{ flex: 1, padding: '15px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          marginBottom: '15px'
        }}>
          Comidas recientes
        </h3>
        <div style={{
          backgroundColor: '#222',
          borderRadius: '10px',
          minHeight: '200px',
          padding: '15px'
        }}>
          {/* Aquí irá la lista de comidas recientes */}
        </div>
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
        <Link to="/search" style={{ color: '#4CAF50', textDecoration: 'none', fontSize: '24px' }}>🔍</Link>
        <Link to="/recetas" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>👨‍🍳</Link>
        <Link to="/progress" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>📈</Link>
      </nav>
    </div>
  );
};

export default Search;
