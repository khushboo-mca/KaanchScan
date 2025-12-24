import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

import kaan from '../assets/kaan.png';        
import kaan1 from "../assets/kaan1.png";       
import all1 from '../assets/all1.png';         
import all from "../assets/all.png";             
import global1 from '../assets/global1.png';    
import global from "../assets/global.png";       
import dark from "../assets/dark.png";
import light from "../assets/light.png";

import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const menuRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setShowLang(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===============================
      ADDITION: THEME BASED IMAGES
  =============================== */
  const logoImg = theme === "dark" ? kaan : kaan1;
  const allIcon = theme === "dark" ? all1 : all;
  const globalIcon = theme === "dark" ? global1 : global;

  return (
    <nav className="Navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        <img src={logoImg} alt="KaanchScan" />
      </Link>

      {/* Desktop Nav */}
      <ul className="nav-links">
        <li><Link to="/transactions">Transactions</Link></li>
        <li><Link to="/blocks">Blocks</Link></li>
        <li><Link to="/validators">Validators</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/token">Tokens</Link></li>
      </ul>

      {/* Right Controls */}
      <div className="nav-actions">

        {/* Theme Toggle */}
        <div className="theme-logo">
          <button onClick={toggleTheme} className="theme-toggle">
            <img src={theme === "light" ? dark : light} alt="theme" />
          </button>
        </div>

        {/* All Menu */}
        <div className="icon-wrap" ref={menuRef}>
          <img
            src={allIcon}
            alt="menu"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="dropdown">
              <Link to="/transactions" className="drop-item">Transactions</Link>
              <Link to="/blocks" className="drop-item">Blocks</Link>
              <Link to="/validators" className="drop-item">Validators</Link>
              <Link to="/analytics" className="drop-item">Analytics</Link>
              <Link to="/token" className="drop-item">Tokens</Link>
            </div>
          )}
        </div>

        {/* Language */}
        <div className="icon-wrap" ref={langRef}>
          <img
            src={globalIcon}
            alt="lang"
            onClick={() => setShowLang(!showLang)}
          />
          {showLang && (
            <div className="dropdown">
              <div className="drop-item">English</div>
              <div className="drop-item">Español</div>
              <div className="drop-item">Deutsch</div>
            </div>
          )}
        </div>

        {/* Network */}
        <select className="network">
          <option>Testnet</option>
        </select>

      </div>
    </nav>
  );
};

export default Navbar;
