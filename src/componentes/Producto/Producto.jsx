import "./Producto.css";
import { useState } from "react";

function Producto() {
  const [mainImage, setMainImage] = useState("Designer.jpeg");

  const handleMouseOver = (image) => {
    setMainImage(image);
  };

  return (
    <div className="tarjeta">
      <div className="tarjeta__image">
        <img src={mainImage} className="large-image" />
        <div className="small-images">
          <img
            src="Designerrr.jpeg"
            className="small-image"
            onMouseOver={() => handleMouseOver("Designerrr.jpeg")}
          />
          <img
            src="Designerr.jpeg"
            className="small-image"
            onMouseOver={() => handleMouseOver("Designerr.jpeg")}
          />
          <img
            src="Designer.jpeg"
            className="small-image"
            onMouseOver={() => handleMouseOver("Designer.jpeg")}
          />
        </div>
      </div>
      <div className="tarjeta__content">
        <div className="tarjeta__content__tag">
          <span className="tag">Shoes</span>
        </div>
        <h3 className="tarjeta__content__title">Camiseta simple blanca</h3>
        <p className="tarjeta__content__info">
          {" "}
          Esta camiseta blanca de corte clásico es perfecta para cualquier
          ocasión. Confeccionada con algodón de alta calidad, ofrece comodidad y
          durabilidad. Su diseño sencillo y elegante la convierte en una prenda
          versátil que puedes combinar fácilmente con cualquier atuendo. Ideal
          para el uso diario o para personalizar con tus propios diseños.
        </p>
        <div className="tarjeta__content__config">
          <div className="price">
            <span className="price">25€</span>
          </div>
        </div>
        <div className="tarjeta__content__action">
          <button className="cart">
            <i className="fa-solid fa-cart-plus"></i> Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Producto;
