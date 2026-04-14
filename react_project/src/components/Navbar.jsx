import { toast } from "react-toastify";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  };
  return (
    <div className="nav">
      <span
        className="material-icons"
        id="hamburger"
        onClick={() => {
          setOpen(!open);
        }}
      >
        menu
      </span>
      <ul className={`Navbar ${open ? "active" : ""}`}>
        <li>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/add" className="nav-link">
            Add Transactions
          </Link>
        </li>
        <li>
          <Link to="/Transactions" className="nav-link">
            All Transactions
          </Link>
        </li>
        <li onClick={handleClick} className="logout">
          <Link to="/" id="link">
            Logout
          </Link>
          <span className="material-icons">logout</span>
        </li>
      </ul>
    </div>
  );
};
