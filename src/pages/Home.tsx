import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <div>
      <h1>Bienvenido a la aplicación de nutrición</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Home;
