import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";
import { FaUser } from "react-icons/fa";

import logo from "./assets/logo.jpg"; // Ensure the logo image is inside the `src/assets` folder

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    navigate("/login", { replace: true }); // Redirect to login
  };

  return (
    <nav className="navbar">
      {/* Logo with Image */}
      <div className="logo">
      
          <img src={logo} alt="Booker Logo" />
        <h2>Booker</h2>  
       
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/buyer">Buy</Link></li>
        <li><Link to="/seller">Sell</Link></li>
        {user && <li><Link to="/profile">Profile</Link></li>}
      </ul>

      {/* Right Section */}
      <div className="nav-right">
        {user ? (
          <>
            <span className="username"><FaUser /> {user.name}</span>
            <button className="nlogout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="nlogin-button" onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
