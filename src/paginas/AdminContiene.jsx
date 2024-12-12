import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminMenu.css";

function AdminContiene() {
  const [contienes, setContienes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editandoContiene, setEditandoContiene] = useState(null);
  const [filtroId, setFiltroId] = useState(""); // Estado para el filtro por ID
  const [formData, setFormData] = useState({
    cantidad: "",
    pedido: "",
    producto: "",
  });

  const [error, setError] = useState(null);
  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/colykke/contiene")
      .then((response) => response.json())
      .then((data) => {
        setContienes(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    fetch("http://localhost:8080/colykke/producto")
      .then((response) => response.json())
      .then((data) => setProductos(data.data))
      .catch((err) => setError("Error al obtener productos: " + err.message));

    fetch("http://localhost:8080/colykke/pedido")
      .then((response) => response.json())
      .then((data) => setPedidos(data.data))
      .catch((err) => setError("Error al obtener pedidos: " + err.message));
  }, []);

  const handleFiltroId = (e) => {
    setFiltroId(e.target.value);
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este contiene?")) {
      fetch(`http://localhost:8080/colykke/contiene/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error del servidor: ${response.status} ${response.statusText}`
            );
          }
          setContienes((prevContiene) =>
            prevContiene.filter((contiene) => contiene.id !== id)
          );
        })
        .catch((err) => {
          setError(`Error al eliminar el contiene: ${err.message}`);
        });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contieneFiltrados = contienes.filter((contiene) =>
    contiene.id.toString().includes(filtroId)
  );

  return (
    <>
      <div>
        <Link to="/admintodopoderoso" className="back-arrow">
          ←
        </Link>
      </div>
      <div className="admin-container">
        <h1>Gestión de Contiene</h1>
        <div className="filtro-container">
          <label>Filtrar por ID: </label>
          <input
            type="text"
            placeholder="Ingrese ID"
            value={filtroId}
            onChange={handleFiltroId}
          />
        </div>
        {loading && <p>Cargando datos...</p>}
        {error && <p>Error: {error}</p>}
        <div className="admin-panel">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cantidad</th>
                  <th>Pedido</th>
                  <th>Producto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contieneFiltrados.map((contiene) => (
                  <tr key={contiene.id}>
                    <td>{contiene.id}</td>
                    <td>{contiene.cantidad}</td>
                    <td>{contiene.pedido?.id || "Sin asignar"}</td>
                    <td>{contiene.producto?.nombre || "Sin asignar"}</td>
                    <td className="acciones">
                      <button
                        className="btn-accion"
                        onClick={() => handleEliminar(contiene.id)}
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

export default AdminContiene;
