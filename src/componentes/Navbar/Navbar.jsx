import { useState, useEffect } from "react";
import "./Navbar.css";
import { UserOutlined, StarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { MdOutlineLocalFireDepartment, MdOutlineNewLabel } from "react-icons/md";
import { PiTShirtBold } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleMouseEnter = (e) => {
    const dropdown = e.currentTarget.nextElementSibling;
    dropdown.classList.add("show-dropdown");
    dropdown.style.display = "block"; // Ensure dropdown is displayed
  };

  const handleMouseLeave = (e) => {
    const dropdown = e.currentTarget.nextElementSibling;
    setTimeout(() => {
      if (!dropdown.matches(":hover")) {
        dropdown.classList.remove("show-dropdown");
        dropdown.style.display = "none"; // Ensure dropdown is hidden after delay
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
        <li
          className={`navbar-item ${activeLink === "/marcas" ? "active" : ""}`}
        >
          <a href="/marcas" onClick={() => handleLinkClick("/marcas")}>
          <HiOutlineShoppingBag style={{color: "#101128", fontSize: "29px"}}/>
            <span className="link-text">Marcas</span>
          </a>
        </li>
        <li className="navbar-item prendas-dropdown-container">
          <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <PiTShirtBold style={{color: "#101128", fontSize: "25px"}}/>
            <span className="link-text">Prendas</span>
          </a>
          <ul
            className="prendas-dropdown"
            onMouseLeave={(e) => {
              setTimeout(() => {
                if (!e.currentTarget.matches(":hover")) {
                  e.currentTarget.classList.remove("show-dropdown");
                }
              }, 500);
            }}
          >
            <li>
              <a
                href="/prendas/camisas"
                onClick={() => handleLinkClick("/prendas/camisas")}
              >
                Camisas
              </a>
            </li>
            <li>
              <a
                href="/prendas/pantalones"
                onClick={() => handleLinkClick("/prendas/pantalones")}
              >
                Pantalones
              </a>
            </li>
            <li>
              <a
                href="/prendas/vestidos"
                onClick={() => handleLinkClick("/prendas/vestidos")}
              >
                Vestidos
              </a>
            </li>
            <li>
              <a
                href="/prendas/chaquetas"
                onClick={() => handleLinkClick("/prendas/chaquetas")}
              >
                Chaquetas
              </a>
            </li>
            <li>
              <a
                href="/prendas/sudaderas"
                onClick={() => handleLinkClick("/prendas/sudaderas")}
              >
                Sudaderas
              </a>
            </li>
            <li>
              <a
                href="/prendas/complementos"
                onClick={() => handleLinkClick("/prendas/complementos")}
              >
                Complementos
              </a>
            </li>
            <li>
              <a
                href="/prendas/bolsos"
                onClick={() => handleLinkClick("/prendas/bolsos")}
              >
                Bolsos
              </a>
            </li>
            <li>
              <a
                href="/prendas/interior"
                onClick={() => handleLinkClick("/prendas/interior")}
              >
                Ropa Interior
              </a>
            </li>
          </ul>
        </li>
        <li
          className={`navbar-item ${
            activeLink === "/novedades" ? "active" : ""
          }`}
        >
          <a href="/novedades" onClick={() => handleLinkClick("/novedades")}>
          <MdOutlineNewLabel style={{color: "#101128", fontSize: "29px"}}/>
            <span className="link-text">Novedades</span>
          </a>
        </li>
        <li
          className={`navbar-item ${
            activeLink === "/mas-vendido" ? "active" : ""
          }`}
        >
          <a
            href="/mas-vendido"
            onClick={() => handleLinkClick("/mas-vendido")}
          >
            <MdOutlineLocalFireDepartment style={{color: "#101128", fontSize: "29px"}}/>
            <span className="link-text">Top Ventas</span>
          </a>
        </li>
      </ul>
      <div className="navbar-buttons">
        <button className="fav-button">
          <a href="/favs">
            <StarOutlined style={{ color: "white", fontSize: "18px" }} />
          </a>
        </button>
        <button className="cart-button">
          <a href="/carrito">
            <ShoppingCartOutlined style={{ color: "white", fontSize: "18px" }} />
          </a>
        </button>
        <button className="user-button">
          <a href="/login">
            <UserOutlined style={{ color: "white", fontSize: "18px" }} />
          </a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
