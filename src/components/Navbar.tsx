import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/Home">🏠</Link>
      <Link to="/search">🔍</Link>
      <Link to="/recetas">👨‍🍳</Link>
      <Link to="/progress">📈</Link>
    </nav>
  );
};

export default Navbar;
  