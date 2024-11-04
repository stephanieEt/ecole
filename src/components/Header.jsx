import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>École St Joseph</h1>
      </div>
      <nav className={isOpen ? "nav open" : "nav"}>
        <ul className="nav-links">
          <li>
            <NavLink to="/">Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/L'école">L'école</NavLink>
          </li>
          <li>
            <NavLink to="/Infos">Infos pratiques</NavLink>
          </li>
          <li>
            <a href="#associations">Equipe éducative</a>
          </li>{" "}
          <li>
            <a href="#associations">Associations</a>
          </li>{" "}
          <li>
            <a href="#associations">Contact</a>
          </li>{" "}
          <li>
            <a href="#associations">Photos</a>
          </li>
        </ul>
      </nav>
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Header;
