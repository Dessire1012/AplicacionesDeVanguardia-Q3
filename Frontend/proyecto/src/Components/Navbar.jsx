import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/Navbar.css";
import { FaUser, FaCog, FaSignOutAlt, FaFilePdf } from "react-icons/fa";
import Settings from "./Settings";
import iconoChatbot from "../Imagenes/chat-bot.png";

const Navbar = ({ userName, userPhoto }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSilaboModalOpen, setIsSilaboModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const openSilaboModal = () => {
    setIsDropdownOpen(false);
    setIsSilaboModalOpen(true);
  };

  const closeSilaboModal = () => setIsSilaboModalOpen(false);

  const openSettingsModal = () => {
    setIsDropdownOpen(false);
    setIsSettingsModalOpen(true);
  };

  const closeSettingsModal = () => setIsSettingsModalOpen(false);

  return (
    <nav className="navbar">
      <Link to="/chatbot" className="navbar-title">
        <img src={iconoChatbot} alt="Chatbot Icon" className="icono-chatbot" />
        Chatbot Vanguard
      </Link>
      <div className="navbar-user">
        <h4 className="welcome">Welcome back,</h4>
        {userName && <span className="user-name">{userName}</span>}
        <button onClick={toggleDropdown} className="user-button">
          {userPhoto ? (
            <img src={userPhoto} alt="User" className="user-photo" />
          ) : (
            <FaUser />
          )}
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <li>
              <button onClick={openSilaboModal} className="dropdown-button">
                <FaFilePdf style={{ marginRight: "8px" }} /> Silabo
              </button>
            </li>
            <hr className="menu-divider" />
            <li>
              <button onClick={openSettingsModal} className="dropdown-button">
                <FaCog style={{ marginRight: "8px" }} /> Settings
              </button>
            </li>
            <li>
              <Link to="/" className="dropdown-button">
                <FaSignOutAlt style={{ marginRight: "8px" }} /> Log out
              </Link>
            </li>
          </ul>
        )}
      </div>
      {isSilaboModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeSilaboModal}>
              &times;
            </span>
            <iframe
              src="/Silabo.pdf"
              width="100%"
              height="500px"
              title="Silabo PDF"
            />
          </div>
        </div>
      )}
      <Settings isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
    </nav>
  );
};

export default Navbar;
