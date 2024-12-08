import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminMenu.css";

function AdminVendedores() {
  const [vendedores, setVendedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editandoVendedor, setEditandoVendedor] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    correoElectronico: "",
    contrasenia: "",
    logo: "",
    telefono: "",
    info: "",
  });

  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [nuevoVendedor, setNuevoVendedor] = useState({
    nombre: "",
    correoElectronico: "",
    contrasenia: "",
    logo: "",
    telefono: "",
    info: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/colykke/vendedor")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setVendedores(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleEditar = (id) => {
    const vendedor = vendedores.find((vendedor) => vendedor.id === id);
    setEditandoVendedor(vendedor);
    setFormData({ ...vendedor });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este vendedor?")) {
      fetch(`http://localhost:8080/colykke/vendedor/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error del servidor: ${response.status} ${response.statusText}`
            );
          }
          setVendedores((prevVendedores) =>
            prevVendedores.filter((vendedor) => vendedor.id !== id)
          );
        })
        .catch((err) => {
          console.error("Error al eliminar el vendedor:", err.message);
          setError(`Error al eliminar el vendedor: ${err.message}`);
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
    fetch(`http://localhost:8080/colykke/vendedor/${editandoVendedor.id}`, {
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
      .then((updatedVendedor) => {
        setVendedores((prevVendedores) =>
          prevVendedores.map((vendedor) =>
            vendedor.id === updatedVendedor.data.id
              ? updatedVendedor.data
              : vendedor
          )
        );
        setEditandoVendedor(null);
      })
      .catch((err) => {
        console.error("Error al actualizar el vendedor:", err.message);
        setError(`Error al actualizar el vendedor: ${err.message}`);
      });
  };

  const handleChangeNuevo = (e) => {
    setNuevoVendedor({
      ...nuevoVendedor,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgregarNuevoVendedor = () => {
    fetch("http://localhost:8080/colykke/vendedor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoVendedor),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error del servidor: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((vendedorCreado) => {
        setVendedores((prevVendedores) => [
          ...prevVendedores,
          vendedorCreado.data,
        ]);
        setMostrarFormularioNuevo(false);
        setNuevoVendedor({
          nombre: "",
          correoElectronico: "",
          contrasenia: "",
          logo: "",
          telefono: "",
          info: "",
        });
      })
      .catch((err) => {
        console.error("Error al agregar nuevo vendedor:", err.message);
        setError(`Error al agregar nuevo vendedor: ${err.message}`);
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
                  <th>Correo Electrónico</th>
                  <th>Contraseña</th>
                  <th>Logo</th>
                  <th>Teléfono</th>
                  <th>Info</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vendedores.map((vendedor) => (
                  <tr key={vendedor.id}>
                    <td>{vendedor.id}</td>
                    <td>{vendedor.nombre}</td>
                    <td>{vendedor.correoElectronico}</td>
                    <td>{vendedor.contrasenia}</td>
                    <td>
                      {/* Mostrar la imagen */}
                      <img
                        src={vendedor.logo}
                        alt={vendedor.nombre}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                      />
                    </td>
                    <td>{vendedor.telefono}</td>
                    <td>{vendedor.info}</td>
                    <td className="acciones">
                      <button
                        className="btn-accion"
                        onClick={() => handleEditar(vendedor.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-accion"
                        onClick={() => handleEliminar(vendedor.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editandoVendedor && (
            <div className="form-edicion">
              <h3>Editando Vendedor</h3>
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
                <label>
                  Logo:
                  <input
                    type="text"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Información:
                  <input
                    type="text"
                    name="info"
                    value={formData.info}
                    onChange={handleChange}
                  />
                </label>
                <button type="button" onClick={handleGuardar}>
                  Guardar
                </button>
                <button type="button" onClick={() => setEditandoVendedor(null)}>
                  Cancelar
                </button>
              </form>
            </div>
          )}

          {mostrarFormularioNuevo && (
            <div className="modal">
              <div className="modal-content">
                <h3>Añadir Nuevo Vendedor</h3>
                <form>
                  <label>
                    Nombre:
                    <input
                      type="text"
                      name="nombre"
                      value={nuevoVendedor.nombre}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Correo Electrónico:
                    <input
                      type="email"
                      name="correoElectronico"
                      value={nuevoVendedor.correoElectronico}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Contraseña:
                    <input
                      type="password"
                      name="contrasenia"
                      value={nuevoVendedor.contrasenia}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Logo:
                    <input
                      type="text"
                      name="logo"
                      value={nuevoVendedor.logo}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Teléfono:
                    <input
                      type="text"
                      name="telefono"
                      value={nuevoVendedor.telefono}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Info:
                    <input
                      type="text"
                      name="info"
                      value={nuevoVendedor.info}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <button type="button" onClick={handleAgregarNuevoVendedor}>
                    Añadir
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

export default AdminVendedores;
