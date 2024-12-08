import React, { useEffect, useState } from 'react';
import { FloatButton } from 'antd';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import Carousel from '../componentes/Carousel';  // Importamos el nuevo componente

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
       expedita iure itaque incidunt nobis quo ut voluptates, quaerat sapiente suscipit laborum nesciunt vero deleniti reprehenderit obcaecati? Sunt commodi nihil laborum voluptas delectus reiciendis odit necessitatibus atque aperiam doloribus in ullam dolorem cupiditate natus veniam dicta, ducimus voluptates ipsum tenetur? Quisquam, enim unde a labore sed illo temporibus suscipit autem vitae libero odio, ipsa eligendi aspernatur similique! Dolorum voluptate eveniet, quam atque fugiat voluptatem sint ratione saepe dolor quis iusto! Ad, itaque voluptates!
      </div>
      <Footer className="pie" />
      <FloatButton.BackTop className="back-to-top-btn" />
    </div>
  );
}

export default Inicio;
