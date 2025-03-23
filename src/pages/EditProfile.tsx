import { Link } from 'react-router-dom';

const EditProfile = () => {
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
        justifyContent: 'space-between'
      }}>
        <h2>Editar Perfil</h2>
      </div>

      {/* Contenido del perfil */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Nombre</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#333',
                border: '1px solid #444',
                borderRadius: '4px',
                color: 'white'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#333',
                border: '1px solid #444',
                borderRadius: '4px',
                color: 'white'
              }}
            />
          </div>

          <button
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Guardar Cambios
          </button>
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
        <Link to="/search" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>🔍</Link>
        <Link to="/recetas" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>👨‍🍳</Link>
        <Link to="/progress" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>📈</Link>
      </nav>
    </div>
  );
};

export default EditProfile;
