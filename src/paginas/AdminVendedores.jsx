import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminMenu.css";

function AdminVendedores() {
  const [vendedores, setVendedores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editandoVendedor, setEditandoVendedor] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    usuarioId: "",
    logo: "",
    telefono: "",
    info: "",
  });

  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [nuevoVendedor, setNuevoVendedor] = useState({
    nombre: "",
    usuarioId: "",
    logo: "",
    telefono: "",
    info: "",
  });

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/colykke/vendedor"),
      fetch("http://localhost:8080/colykke/usuario"),
    ])
      .then(async ([vendedoresRes, usuariosRes]) => {
        if (!vendedoresRes.ok || !usuariosRes.ok) {
          throw new Error("Error al obtener los datos");
        }
        const vendedoresData = await vendedoresRes.json();
        const usuariosData = await usuariosRes.json();
        setVendedores(vendedoresData.data);
        setUsuarios(usuariosData.data);
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
    setFormData({
      nombre: vendedor.nombre,
      usuarioId: vendedor.usuario.id,
      logo: vendedor.logo,
      telefono: vendedor.telefono,
      info: vendedor.info,
    });
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
    if (!formData.usuarioId) {
      setError("Debes seleccionar un usuario.");
      return;
    }

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
    const { name, value } = e.target;
    setNuevoVendedor({
      ...nuevoVendedor,
      [name]: value,
    });
  };

  const handleAgregarNuevoVendedor = () => {
    if (!nuevoVendedor.usuarioId) {
      setError("Debes seleccionar un usuario.");
      return;
    }

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
        setVendedores((prevVendedores) => [...prevVendedores, vendedorCreado.data]);
        setMostrarFormularioNuevo(false);
        setNuevoVendedor({
          nombre: "",
          usuarioId: "",
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
                  <th>Usuario</th>
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
                    <td>{vendedor.usuario.username}</td>
                    <td><img src={vendedor.logo} alt="Logo" style={{ width: "50px" }} /></td>
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
                  Teléfono:
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Info:
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
                    Usuario:
                    <select
                      name="usuarioId"
                      value={nuevoVendedor.usuarioId}
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
