import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AdminMenu.css";

function AdminUsuarios() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editandoCliente, setEditandoCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correoElectronico: "",
    contrasenia: "",
  });

  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    telefono: "",
    correoElectronico: "",
    contrasenia: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/colykke/cliente")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos: " + response.statusText);
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
    setFormData({ ...cliente });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
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
    fetch(`http://localhost:8080/colykke/cliente/${editandoCliente.id}`, {
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
    setNuevoCliente({
      ...nuevoCliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgregarNuevoCliente = () => {
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
          telefono: "",
          correoElectronico: "",
          contrasenia: "",
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
                  <th>Teléfono</th>
                  <th>Correo Electrónico</th>
                  <th>Contraseña</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.correoElectronico}</td>
                    <td>{cliente.contrasenia}</td>
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
                  Teléfono:
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Correo Electrónico:
                  <input
                    type="email"
                    name="correoElectronico"
                    value={formData.correoElectronico}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Contraseña:
                  <input
                    type="password"
                    name="contrasenia"
                    value={formData.contrasenia}
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
                    Teléfono:
                    <input
                      type="text"
                      name="telefono"
                      value={nuevoCliente.telefono}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Correo Electrónico:
                    <input
                      type="email"
                      name="correoElectronico"
                      value={nuevoCliente.correoElectronico}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Contraseña:
                    <input
                      type="password"
                      name="contrasenia"
                      value={nuevoCliente.contrasenia}
                      onChange={handleChangeNuevo}
                    />
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

export default AdminUsuarios;
