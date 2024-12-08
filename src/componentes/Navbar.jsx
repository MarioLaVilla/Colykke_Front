import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

const handleMouseEnter = (e) => {
    const dropdown = e.currentTarget.nextElementSibling;
    dropdown.classList.add("show-dropdown");
    dropdown.style.display = 'block'; // Ensure dropdown is displayed
  };

const handleMouseLeave = (e) => {
    const dropdown = e.currentTarget.nextElementSibling;
    setTimeout(() => {
        if (!dropdown.matches(":hover")) {
            dropdown.classList.remove("show-dropdown");
            dropdown.style.display = 'none'; // Ensure dropdown is hidden after delay
        }
    }, 500); // Keep dropdown open for 500ms
  };

  return (
    <nav className="vertical-navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src="logo.png" alt="Logo" className="logo" />
        </a>
      </div>
      <ul className="navbar-links">
        <li className={`navbar-item ${activeLink === '/marcas' ? 'active' : ''}`}>
          <a href="/marcas" onClick={() => handleLinkClick('/marcas')}>
            <img src="/marcas.png" alt="Marcas" className="icon" />
            <span className="link-text">Marcas</span>
          </a>
        </li>
        <li className="navbar-item prendas-dropdown-container">
          <a
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/prendas.png" alt="Prendas" className="icon" />
            <span className="link-text">Prendas</span>
          </a>
          <ul className="prendas-dropdown" onMouseLeave={(e) => {
            setTimeout(() => {
              if (!e.currentTarget.matches(":hover")) {
                e.currentTarget.classList.remove("show-dropdown");
              }
            }, 500);
          }}>
            <li>
              <a href="/prendas/camisas" onClick={() => handleLinkClick('/prendas/camisas')}>Camisas</a>
            </li>
            <li>
              <a href="/prendas/pantalones" onClick={() => handleLinkClick('/prendas/pantalones')}>Pantalones</a>
            </li>
            <li>
              <a href="/prendas/vestidos" onClick={() => handleLinkClick('/prendas/vestidos')}>Vestidos</a>
            </li>
            <li>
              <a href="/prendas/chaquetas" onClick={() => handleLinkClick('/prendas/chaquetas')}>Chaquetas</a>
            </li>
            <li>
              <a href="/prendas/sudaderas" onClick={() => handleLinkClick('/prendas/sudaderas')}>Sudaderas</a>
            </li>
            <li>
              <a href="/prendas/complementos" onClick={() => handleLinkClick('/prendas/complementos')}>Complementos</a>
            </li>
            <li>
              <a href="/prendas/bolsos" onClick={() => handleLinkClick('/prendas/bolsos')}>Bolsos</a>
            </li>
            <li>
              <a href="/prendas/interior" onClick={() => handleLinkClick('/prendas/interior')}>Ropa Interior</a>
            </li>
          </ul>
        </li>
        <li className={`navbar-item ${activeLink === '/novedades' ? 'active' : ''}`}>
          <a href="/novedades" onClick={() => handleLinkClick('/novedades')}>
            <img src="/novedades.png" alt="Novedades" className="icon" />
            <span className="link-text">Novedades</span>
          </a>
        </li>
        <li className={`navbar-item ${activeLink === '/mas-vendido' ? 'active' : ''}`}>
          <a href="/mas-vendido" onClick={() => handleLinkClick('/mas-vendido')}>
            <img src="/top-ventas.svg" alt="Top Ventas" className="icon" />
            <span className="link-text">Top Ventas</span>
          </a>
        </li>
      </ul>
      <div className="navbar-buttons">
        <button className="fav-button">
          <a href="/favs">
            <img src="/fav.png" alt="Favoritos" />
          </a>
        </button>
        <button className="cart-button">
          <a href="/carrito">
            <img src="/carro.png" alt="Carrito" />
          </a>
        </button>
        <button className="user-button">
          <a href="/login">
            <img src="/usuario.svg" alt="Usuario" />
          </a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
