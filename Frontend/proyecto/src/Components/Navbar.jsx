import React, { useState } from 'react';
import './Styles/Navbar.css';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importa los iconos necesarios

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Chatbot</div>
      <div className="navbar-user">
        <button onClick={toggleDropdown} className="user-button">
          <FaUser />
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <li>
              <a href="#edit">
                <FaCog style={{ marginRight: '8px' }} /> Settings
              </a>
            </li>
            <li>
              <a href="#logout">
                <FaSignOutAlt style={{ marginRight: '8px' }} /> Log out
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;