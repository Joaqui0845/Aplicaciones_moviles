import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">🏠</Link>
      <Link to="/search">🔍</Link>
      <Link to="/profile">👤</Link>
      <Link to="/progress">📈</Link>
    </nav>
  );
};

export default Navbar;
  