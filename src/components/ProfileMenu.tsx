import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica de cierre de sesión
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          padding: '5px',
          cursor: 'pointer'
        }}
      >
        👤
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '100%',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '8px',
          minWidth: '150px',
          zIndex: 1000
        }}>
          <button
            onClick={handleEditProfile}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            ✏️ Editar Perfil
          </button>
          <button
            onClick={handleLogout}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ff4444',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: '4px',
              marginTop: '4px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
