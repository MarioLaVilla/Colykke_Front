import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-container">

        <a href="/about" className="footer-link">
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
            <img src="instagram.svg" alt="Instagram" />
          </a>
          <a href="mailto:colykke@gmail.com" className="footer-button">
            <img src="email.png" alt="Correo electrónico" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
