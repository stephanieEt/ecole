import React from "react";
import { NavLink } from "react-router-dom";

const Infos = () => {
  return (
    <div className="infos-page">
      <ul>
        <li>
          <NavLink to="/Inscriptions">Inscriptions</NavLink>
        </li>
        <li>
          <NavLink to="/Tarifs">Tarifs</NavLink>
        </li>
        <li>
          <NavLink to="/Calendrier">Calendrier</NavLink>
        </li>
        <li>
          <NavLink to="/Circulaire">Circulaire de rentrée</NavLink>
        </li>
        <li>
          <NavLink to="/Fournitures">Liste de fournitures</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Infos;
