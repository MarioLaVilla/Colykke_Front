import React from 'react';
import Slider from 'react-slick';
import { Card } from 'antd';
import Marca from '../Marca/Marca';
import "slick-carousel/slick/slick.css";
import "./Carousel.css"; 
import "slick-carousel/slick/slick-theme.css";

const { Meta } = Card;

const Carousel = ({ productos = [], marcas = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      <div>
        <h2>Lo + Vendido</h2>
        <div className="producto-slider">
          {Array.isArray(productos) && productos.length > 0 ? (
            productos.slice(0, 6).map((producto) => (
              <Card
                key={producto.id}
                hoverable
                className="product-card"
                cover={<img alt={producto.nombre} src={producto.imagen} />}
              >
                <Meta title={producto.nombre} description={`${producto.precio} €`} />
              </Card>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </div>
      <div>
        <h2>Novedades</h2>
        <div className="producto-slider">
          {Array.isArray(productos) && productos.length > 0 ? (
            productos.slice(6, 12).map((producto) => (
              <Card
                key={producto.id}
                hoverable
                className="product-card"
                cover={<img alt={producto.nombre} src={producto.imagen} />}
              >
                <Meta title={producto.nombre} description={`${producto.precio} €`} />
              </Card>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </div>
      <div>
        <h2>Marcas Populares</h2>
        <div className="marca-slider">
          {Array.isArray(marcas) && marcas.length > 0 ? (
            marcas.slice(0, 6).map((marca) => (
              <div className="marca-card" key={marca.id}>
                <Card
                key={marca.id}
                hoverable
                className="marca-card"
                cover={<img alt={marca.nombre} src={marca.logo} />}
              >
                <Meta title={marca.nombre} description={marca.info} />
              </Card>
              </div>
            ))
          ) : (
            <p>No hay marcas disponibles.</p>
          )}
        </div>
      </div>
    </Slider>
  );
};

export default Carousel;
