import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = storedUsers.some((u: any) => u.email === email);

    if (userExists) {
      alert('El usuario ya está registrado');
      return;
    }

    const newUser = { email, password };
    localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
    alert('Registro exitoso');
    navigate('/');
  };

  return (
      <div className="login-container">
      <h2>Registro</h2>
      <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrarse</button>
      <p>¿Ya tienes cuenta? <a href="/">Inicia sesión</a></p>
    </div>
  );
};

export default Register;
