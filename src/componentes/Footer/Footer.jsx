import "./Footer.css";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <a href="/about" className="footer-link" style={{color:"#313131"}}>
          Sobre nosotros 
        </a>
        <p className="footer-copyright">
          {" "}
          © 2024 Colykke. Todos los derechos reservados.
        </p>
        <div className="footer-buttons">
          <a
            href="https://www.instagram.com/colykke/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-button"
          >
            <FaInstagram style={{ color: "#313131", fontSize: "18px" }}/>
          </a>
          <a href="mailto:colykke@gmail.com" className="footer-button">
            <MdOutlineAlternateEmail style={{ color: "#313131", fontSize: "18px" }}/>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
