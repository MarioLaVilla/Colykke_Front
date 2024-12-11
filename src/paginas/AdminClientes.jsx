import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AdminMenu.css";

function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editandoCliente, setEditandoCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    usuarioId: "",
  });

  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    usuarioId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/colykke/cliente"),
      fetch("http://localhost:8080/colykke/usuario"),
    ])
      .then(async ([clientesRes, usuariosRes]) => {
        if (!clientesRes.ok || !usuariosRes.ok) {
          throw new Error("Error al obtener los datos");
        }
        const clientesData = await clientesRes.json();
        const usuariosData = await usuariosRes.json();
        setClientes(clientesData.data);
        setUsuarios(usuariosData.data);
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
      usuarioId: cliente.usuario.id,
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = () => {
    if (!formData.usuarioId) {
      setError("Debes seleccionar un usuario.");
      return;
    }

    fetch(`http://localhost:8080/colykke/cliente/${editandoCliente.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        usuarioId: formData.usuarioId,
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
    if (!nuevoCliente.usuarioId) {
      setError("Debes seleccionar un usuario.");
      return;
    }

    fetch("http://localhost:8080/colykke/cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoCliente),
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
          usuarioId: "",
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
                  Usuario:
                  <select
                    name="usuarioId"
                    value={formData.usuarioId}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona un usuario</option>
                    {usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.username} ({usuario.email})
                      </option>
                    ))}
                  </select>
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
                <h3>Añadir Nuevo Usuario</h3>
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
                    Usuario:
                    <select
                      name="usuarioId"
                      value={nuevoCliente.usuarioId}
                      onChange={handleChangeNuevo}
                    >
                      <option value="">Selecciona un usuario</option>
                      {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                          {usuario.username} ({usuario.email})
                        </option>
                      ))}
                    </select>
                  </label>
                  <button type="button" onClick={handleAgregarNuevoCliente}>
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

export default AdminClientes;
