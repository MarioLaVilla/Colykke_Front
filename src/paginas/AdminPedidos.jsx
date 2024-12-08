import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AdminMenu.css";

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editandoPedido, setEditandoPedido] = useState(null);
  const [formData, setFormData] = useState({
    fechaRealizado: "",
    direccion: "",
    cliente: "",
    productos: [],
  });

  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [nuevoPedido, setNuevoPedido] = useState({
    fechaRealizado: "",
    direccion: "",
    cliente: "",
    productos: [],
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/colykke/pedido")
      .then((response) => response.json())
      .then((data) => {
        setPedidos(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    fetch("http://localhost:8080/colykke/cliente")
      .then((response) => response.json())
      .then((data) => setClientes(data.data))
      .catch((err) => setError("Error al obtener clientes: " + err.message));

    fetch("http://localhost:8080/colykke/producto")
      .then((response) => response.json())
      .then((data) => setProductos(data.data))
      .catch((err) => setError("Error al obtener productos: " + err.message));
  }, []);

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
      fetch(`http://localhost:8080/colykke/pedido/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error del servidor: ${response.status} ${response.statusText}`
            );
          }
          setPedidos((prevPedidos) =>
            prevPedidos.filter((pedido) => pedido.id !== id)
          );
        })
        .catch((err) => {
          setError(`Error al eliminar el pedido: ${err.message}`);
        });
    }
  };

  return (
    <>
      <div>
        <Link to="/admintodopoderoso" className="back-arrow">
          ←
        </Link>
      </div>
      <div className="admin-container">
        {loading && <p>Cargando datos...</p>}
        {error && <p>Error: {error}</p>}
        <div className="admin-panel">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha Realizado</th>
                  <th>Dirección</th>
                  <th>Cliente</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{pedido.fechaRealizado}</td>
                    <td>{pedido.direccion}</td>
                    <td>{pedido.cliente?.nombre || "Sin asignar"}</td>
                    <td className="acciones">
                      <button
                        className="btn-accion"
                        onClick={() => handleEliminar(pedido.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPedidos;
