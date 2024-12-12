import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AdminMenu.css";

function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editandoCliente, setEditandoCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    username: "",
  });

  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    email: "",
    username: "",
    password: "", // Añadir el campo para la contraseña
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/colykke/cliente")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        setClientes(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleEditar = (id) => {
    const cliente = clientes.find((cliente) => cliente.id === id);
    setEditandoCliente(cliente);
    setFormData({
      nombre: cliente.nombre,
      email: cliente.usuario.email,
      username: cliente.usuario.username,
    });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      fetch(`http://localhost:8080/colykke/cliente/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error del servidor: ${response.status} ${response.statusText}`
            );
          }
          setClientes((prevClientes) =>
            prevClientes.filter((cliente) => cliente.id !== id)
          );
        })
        .catch((err) => {
          console.error("Error al eliminar el cliente:", err.message);
          setError(`Error al eliminar el cliente: ${err.message}`);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGuardar = () => {
    fetch(`http://localhost:8080/colykke/cliente/${editandoCliente.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        email: formData.email,
        username: formData.username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error del servidor: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((updatedCliente) => {
        setClientes((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente.id === updatedCliente.data.id
              ? updatedCliente.data
              : cliente
          )
        );
        setEditandoCliente(null);
      })
      .catch((err) => {
        console.error("Error al actualizar el cliente:", err.message);
        setError(`Error al actualizar el cliente: ${err.message}`);
      });
  };

  const handleChangeNuevo = (e) => {
    const { name, value } = e.target;
    setNuevoCliente({
      ...nuevoCliente,
      [name]: value,
    });
  };

  const handleAgregarNuevoCliente = () => {
    fetch("http://localhost:8080/colykke/cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nuevoCliente.nombre,
        usuario: {
          email: nuevoCliente.email,
          username: nuevoCliente.username,
          password: nuevoCliente.password,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error del servidor: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((clienteCreado) => {
        setClientes((prevClientes) => [...prevClientes, clienteCreado.data]);
        setMostrarFormularioNuevo(false);
        setNuevoCliente({
          nombre: "",
          email: "",
          username: "",
        });
      })
      .catch((err) => {
        console.error("Error al agregar nuevo cliente:", err.message);
        setError(`Error al agregar nuevo cliente: ${err.message}`);
      });
  };

  return (
    <>
      <div>
        <Link to="/admintodopoderoso" className="back-arrow">
          ←
        </Link>{" "}
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
                  <th>Username</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.usuario.email}</td>
                    <td>{cliente.usuario.username}</td>
                    <td className="acciones">
                      <button
                        className="btn-accion"
                        onClick={() => handleEditar(cliente.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-accion"
                        onClick={() => handleEliminar(cliente.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editandoCliente && (
            <div className="form-edicion">
              <h3>Editando Cliente</h3>
              <form>
                <label>
                  Nombre:
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
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
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </label>
                <button type="button" onClick={handleGuardar}>
                  Guardar
                </button>
                <button type="button" onClick={() => setEditandoCliente(null)}>
                  Cancelar
                </button>
              </form>
            </div>
          )}

          {mostrarFormularioNuevo && (
            <div className="modal">
              <div className="modal-content">
                <h3>Añadir Nuevo Cliente</h3>
                <form>
                  <label>
                    Nombre:
                    <input
                      type="text"
                      name="nombre"
                      value={nuevoCliente.nombre}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={nuevoCliente.email}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Contraseña:
                    <input
                      type="password"
                      name="password"
                      value={nuevoCliente.password}
                      onChange={handleChangeNuevo}
                    />
                  </label>

                  <label>
                    Username:
                    <input
                      type="text"
                      name="username"
                      value={nuevoCliente.username}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <button type="button" onClick={handleAgregarNuevoCliente}>
                    Crear Cliente
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

export default AdminClientes;
