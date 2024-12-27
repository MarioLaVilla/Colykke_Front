import React, { useEffect, useState } from 'react';
import { FloatButton } from 'antd';
import Navbar from '../componentes/Navbar/Navbar';
import Footer from '../componentes/Footer/Footer';
import Carousel from '../componentes/Carousel/Carousel';  // Importamos el nuevo componente

function Inicio() {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);

    useEffect(() => {
      fetch('http://localhost:8080/colykke/producto')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setProductos(data.data))
        .catch(error => console.error('Error fetching productos:', error));
      
      fetch('http://localhost:8080/colykke/vendedor')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setMarcas(data.data))
        .catch(error => console.error('Error fetching marcas:', error));
    }, []);

  return (
    <div className="app-container">
      <Navbar className="navegacion" />
      <div className="contenido-principal">
        <Carousel productos={productos} marcas={marcas} />
        <div className='trabajar'>
          <h1>¿Quieres trabajar con nosotros?</h1>
          <p>Escríbenos un email a <a href="mailto:colykke@gmail.com">colykke@gmail.com</a> con los siguientes datos:</p>
          <ul>
            <li>Logo</li>
            <li>Descripción de la empresa</li>
            <li>Ciudad de origen</li>
          </ul>
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nesciunt error iste distinctio. Recusandae quia assumenda delectus nostrum nesciunt culpa, impedit ipsum et nam itaque non reiciendis odit inventore tempora beatae incidunt repellat. Repellendus, architecto minima? Ducimus minus, rem amet nobis atque dolorem culpa tempora sapiente dolores aut quas? Odit eos maxime labore, praesentium consequuntur minus sed deleniti illum accusamus voluptate error velit nam ex dolorem a perferendis porro dignissimos blanditiis itaque officia veniam ab neque corporis! Voluptatibus maiores magni quasi obcaecati, accusamus minus architecto, libero, dolore quaerat aliquam ipsam excepturi! Deleniti soluta distinctio aliquam voluptatibus quasi explicabo assumenda cum, quam porro animi dicta ullam beatae maxime, illum a inventore quidem nostrum voluptatum laboriosam sint? Dolorum maxime suscipit fugiat? Voluptates mollitia fugiat error consequatur eaque quaerat voluptatum ex ab beatae dignissimos in consectetur, obcaecati alias iusto ducimus itaque quasi doloremque accusamus nulla placeat molestias illo! Cupiditate, esse, quam similique aut qui amet fugiat porro mollitia, ratione tempora repudiandae vero? Quis aliquam nihil similique ducimus quam et deleniti nisi cupiditate, placeat numquam enim omnis corporis error obcaecati nesciunt soluta labore officiis sed in? Aspernatur suscipit aliquam nam maiores consectetur ipsam, nesciunt delectus hic dolore, autem quidem, molestiae repellat illum non repudiandae!
      </div>
      <Footer className="pie" />
      <FloatButton.BackTop className="back-to-top-btn" />
    </div>
  );
}

export default Inicio;
