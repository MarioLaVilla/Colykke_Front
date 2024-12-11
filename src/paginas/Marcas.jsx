import React, { useState, useEffect } from 'react';
import { FloatButton } from 'antd';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import Marca from '../componentes/Marca';
import "./Marcas.css"

function Marcas() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/colykke/vendedor') // Cambia esta URL por la de tu API de marcas
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las marcas: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setMarcas(data.data); // Asegúrate de que la estructura de la respuesta sea correcta
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className='marcas-container'>
        {loading && <p>Cargando marcas...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && marcas.map((marca) => (
          <Marca
            key={marca.id} // Asegúrate de que cada marca tenga un ID único
            name={marca.nombre}
            origin={marca.origen} // Ajusta el nombre del campo según la respuesta de tu API
            image={marca.logo} // Ajusta el nombre del campo según la respuesta de tu API
            link={`/marcas/${marca.nombre}`}
            about={marca.info} // Ajusta el nombre del campo según la respuesta de tu API
          />
        ))}
      </div>
      <Footer />
      <FloatButton.BackTop />
    </div>
  );
}

export default Marcas;
