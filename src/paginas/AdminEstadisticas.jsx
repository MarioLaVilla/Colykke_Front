import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminMenu.css";

function AdminEstadisticas() {
  const [estadisticas, setEstadisticas] = useState({
    clientes: 0,
    vendedores: 0,
    pedidos: 0,
    productos: 0,
    contiene: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all([
          fetch("http://localhost:8080/colykke/cliente"),
          fetch("http://localhost:8080/colykke/vendedor"),
          fetch("http://localhost:8080/colykke/pedido"),
          fetch("http://localhost:8080/colykke/producto"),
          fetch("http://localhost:8080/colykke/contiene"),
        ]);

        const [clientes, vendedores, pedidos, productos, contiene] = await Promise.all(
          responses.map((res) => {
            if (!res.ok) throw new Error(`Error al obtener datos: ${res.status}`);
            return res.json();
          })
        );

        setEstadisticas({
          clientes: clientes.data.length,
          vendedores: vendedores.data.length,
          pedidos: pedidos.data.length,
          productos: productos.data.length,
          contiene: contiene.data.length,
        });
      } catch (err) {
        console.error("Error al cargar las estadísticas:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);

  return (
    <>
      <div>
        <Link to="/admintodopoderoso" className="back-arrow">
          ←
        </Link>
      </div>
      <div className="admin-container">
        <h1>Estadísticas del Sistema</h1>
        {loading && <p>Cargando estadísticas...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <div className="admin-panel">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Entidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Clientes</td>
                    <td>{estadisticas.clientes}</td>
                  </tr>
                  <tr>
                    <td>Vendedores</td>
                    <td>{estadisticas.vendedores}</td>
                  </tr>
                  <tr>
                    <td>Pedidos</td>
                    <td>{estadisticas.pedidos}</td>
                  </tr>
                  <tr>
                    <td>Productos</td>
                    <td>{estadisticas.productos}</td>
                  </tr>
                  <tr>
                    <td>Reseñas (Contiene)</td>
                    <td>{estadisticas.contiene}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminEstadisticas;
