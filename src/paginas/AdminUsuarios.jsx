import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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

  const handleEditar = (id) => {
    const usuario = usuarios.find((usuario) => usuario.id === id);
    setEditandoUsuario(usuario);
    setFormData({ ...usuario });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      fetch(`http://localhost:8080/colykke/usuario/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error del servidor: ${response.status} ${response.statusText}`
            );
          }
          setUsuarios((prevUsuarios) =>
            prevUsuarios.filter((usuario) => usuario.id !== id)
          );
        })
        .catch((err) => {
          console.error("Error al eliminar el usuario:", err.message);
          setError(`Error al eliminar el usuario: ${err.message}`);
        });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = () => {
    fetch(`http://localhost:8080/colykke/usuario/${editandoUsuario.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error del servidor: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((updatedUsuario) => {
        console.log("Usuario actualizado:", updatedUsuario); // Log para depurar
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.id === updatedUsuario.data.id
              ? updatedUsuario.data
              : usuario
          )
        );
        setEditandoUsuario(null);
      })
      .catch((err) => {
        console.error("Error al actualizar el usuario:", err.message);
        setError(`Error al actualizar el usuario: ${err.message}`);
      });
  };

  const handleChangeNuevo = (e) => {
    setNuevoUsuario({
      ...nuevoUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgregarNuevoUsuario = () => {
    fetch("http://localhost:8080/colykke/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Error al crear el usuario");
          });
        }
        return response.json();
      })
      .then((usuarioCreado) => {
        setUsuarios((prevUsuarios) => [...prevUsuarios, usuarioCreado.data]);
        setNuevoUsuario({ username: "", email: "", password: "" });
      })
      .catch((err) =>
        setError(`Error al agregar nuevo usuario: ${err.message}`)
      );
  };

  return (
    <>
      <div>
        <Link to="/admintodopoderoso" className="back-arrow">
          ←
        </Link>
      </div>
      <div className="admin-container">
        <button
          className="añadirusuario"
          onClick={() => setMostrarFormularioNuevo(true)}
        >
          +
        </button>
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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                    <td className="acciones">
                      <button
                        className="btn-accion"
                        onClick={() => handleEditar(usuario.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-accion"
                        onClick={() => handleEliminar(usuario.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editandoUsuario && (
            <div className="form-edicion">
              <h3>Editando Usuario</h3>
              <form>
                <label>
                  Nombre:
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
                <button type="button" onClick={handleGuardar}>
                  Guardar
                </button>
                <button type="button" onClick={() => setEditandoUsuario(null)}>
                  Cancelar
                </button>
              </form>
            </div>
          )}

          {mostrarFormularioNuevo && (
            <div className="modal">
              <div className="modal-content">
                <h3>Añadir Nuevo Usuario</h3>
                <form>
                  <label>
                    Nombre:
                    <input
                      type="text"
                      name="username"
                      value={nuevoUsuario.username}
                      onChange={(e) =>
                        setNuevoUsuario({
                          ...nuevoUsuario,
                          username: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={nuevoUsuario.email}
                      onChange={(e) =>
                        setNuevoUsuario({
                          ...nuevoUsuario,
                          email: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    Contraseña:
                    <input
                      type="password"
                      name="password"
                      value={nuevoUsuario.password}
                      onChange={(e) =>
                        setNuevoUsuario({
                          ...nuevoUsuario,
                          password: e.target.value,
                        })
                      }
                    />
                  </label>
                  <button type="button" onClick={handleAgregarNuevoUsuario}>
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setMostrarFormularioNuevo(false)}
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminUsuarios;
