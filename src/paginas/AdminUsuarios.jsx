import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AdminMenu.css";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: "",
    email: "",
  });
  const [filtroId, setFiltroId] = useState(""); // Estado para el filtro por ID

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/colykke/usuario")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Usuarios obtenidos:", data); // Log para depurar
        setUsuarios(data.data); // Asegúrate de que esta es la estructura correcta
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener los datos:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleFiltroId = (e) => {
    setFiltroId(e.target.value);
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.id.toString().includes(filtroId)
  );

  return (
    <>
      <div>
        <Link to="/admintodopoderoso" className="back-arrow">
          ←
        </Link>
      </div>
      <div className="admin-container">
        <h1>Gestión de Usuarios</h1>
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
                  <th>Nombre</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
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

export default AdminUsuarios;