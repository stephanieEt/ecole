import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false); // Ferme la navbar
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>École St Joseph</h1>
      </div>
      <nav className={isOpen ? "nav open" : "nav"}>
        <ul className="nav-links">
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/L'école" onClick={closeMenu}>
              L'école
            </NavLink>
          </li>
          <li>
            <NavLink to="/Infos" onClick={closeMenu}>
              Infos pratiques
            </NavLink>
          </li>
          <li>
            <NavLink to="/Equipe" onClick={closeMenu}>
              Equipe éducative
            </NavLink>
          </li>
          <li>
            <NavLink to="/Associations" onClick={closeMenu}>
              Associations
            </NavLink>
          </li>
          <li>
            <NavLink to="/Contact" onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/Photos" onClick={closeMenu}>
              Photos
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Header;
