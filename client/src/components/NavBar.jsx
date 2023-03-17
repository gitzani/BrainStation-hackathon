import React from "react";
// import navLogo from "../../assets/images/Logo/BrainFlix-logo.svg";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="nav__content">
        <div className="nav__input--container">
          <NavLink to="/" className="nav__button">Create Character</NavLink>
          <NavLink to="/characters" className="nav__button">Existing Characters</NavLink>
        </div>
      </div>
    </nav>
  );
}
