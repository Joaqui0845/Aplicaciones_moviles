import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register';
import Home from './pages/Home';
import Search from './pages/Search';
import Recetas from './pages/Recetas';
import Progress from './pages/Progress';
import EditProfile from './pages/EditProfile';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/recetas" element={<Recetas />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
}

export default App;
