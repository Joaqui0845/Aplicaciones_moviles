import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cafe from './pagesrecurse/cafe.jpg';
import arroz from './pagesrecurse/arroz.jpg';
import frijoles from './pagesrecurse/frijoles.jpg';
import pasta from './pagesrecurse/pasta.webp';
import pan from './pagesrecurse/pan.jpg';
import huevos from './pagesrecurse/huevos.jpg';
import carneres from './pagesrecurse/carneres.jpg';
import pollo from './pagesrecurse/pollo.jpg';
import pescado from './pagesrecurse/pescado.jpg';


const Search = () => {
  const [basicBasket, setBasicBasket] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const basketData = [
      { id: 1, name: 'Arroz', image: arroz},
      { id: 2, name: 'Frijoles', image: frijoles },
      { id: 7, name: 'Pasta', image: pasta },
      { id: 8, name: 'Pan', image: pan },
      { id: 10, name: 'Huevos', image: huevos },
      { id: 11, name: 'Carne de Res', image: carneres },
      { id: 12, name: 'Pollo', image:  pollo},
      { id: 13, name: 'Pescado', image: pescado },
      { id: 25, name: 'Café', image: cafe },

    ];
    setBasicBasket(basketData);
  }, []);

  // Filtrar la lista según el término de búsqueda
  const filteredBasket = basicBasket.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estilos inline
  const containerStyle = {
    backgroundColor: '#1a1a1a',
    color: 'white',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    padding: '10px 15px',
    borderBottom: '1px solid #333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  };

  const searchBarStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: '20px',
    padding: '8px 15px',
    gap: '10px',
    marginBottom: '10px'
  };

  const inputStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    width: '100%',
    outline: 'none'
  };

  const headerButtonsStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%'
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    padding: '5px'
  };

  const contentStyle = {
    flex: 1,
    padding: '15px'
  };

  const h3Style = {
    fontSize: '18px',
    marginBottom: '15px'
  };

  const scrollContainerStyle = {
    backgroundColor: '#222',
    borderRadius: '10px',
    minHeight: '200px',
    maxHeight: '400px', // Ajusta según tus necesidades
    padding: '15px',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch'
  };

  const basketItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#333',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '10px'
  };

  const imageStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '5px'
  };

  const placeholderImageStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '5px',
    backgroundColor: '#555'
  };

  const navBarStyle = {
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
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '24px'
  };

  const activeLinkStyle = {
    color: '#4CAF50',
    textDecoration: 'none',
    fontSize: '24px'
  };

  return (
    <div style={containerStyle}>
      {/* Estilos embebidos para media queries y scroll */}
      <style>
        {`
          @media (max-width: 600px) {
            .header {
              flex-direction: column;
              align-items: stretch;
            }
            .header-buttons {
              display: flex;
              justify-content: space-around;
              width: 100%;
            }
            .nav-bar {
              font-size: 20px;
            }
          }
          /* Ocultar la barra de scroll en navegadores compatibles */
          .scroll-container::-webkit-scrollbar {
            display: none;
          }
          .scroll-container {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      {/* Encabezado */}
      <header className="header" style={headerStyle}>
        <div style={searchBarStyle}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div className="header-buttons" style={headerButtonsStyle}>
          <button style={buttonStyle}>⌛</button>
          <button style={buttonStyle}>❤️</button>
        </div>
      </header>

      {/* Contenido principal */}
      <main style={contentStyle}>
        <h3 style={h3Style}>Alimentos</h3>
        <div className="scroll-container" style={scrollContainerStyle}>
          {filteredBasket.length > 0 ? (
            filteredBasket.map(item => (
              <div key={item.id} style={basketItemStyle}>
                {item.image ? (
                  <img src={item.image} alt={item.name} style={imageStyle} />
                ) : (
                  <div style={placeholderImageStyle} />
                )}
                <span>{item.name}</span>
              </div>
            ))
          ) : (
            <p>No se encontraron alimentos.</p>
          )}
        </div>
      </main>

      {/* Barra de navegación inferior */}
      <nav className="nav-bar" style={navBarStyle}>
        <Link to="/home" style={linkStyle}>🏠</Link>
        <Link to="/search" style={activeLinkStyle}>🔍</Link>
        <Link to="/recetas" style={linkStyle}>👨‍🍳</Link>
        <Link to="/progress" style={linkStyle}>📈</Link>
      </nav>
    </div>
  );
};

export default Search;