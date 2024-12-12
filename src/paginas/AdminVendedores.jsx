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
    logo: "",
    telefono: "",
    info: "",
  });

  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [nuevoVendedor, setNuevoVendedor] = useState({
    nombre: "",
    email: "",
    username: "",
    password: "",
    logo: "",
    telefono: "",
    info: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/colykke/vendedor")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
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
    setFormData({
      nombre: vendedor.nombre,
      email: vendedor.usuario.email, // Asegúrate de que el vendedor tiene un objeto `usuario`
      username: vendedor.usuario.username,
      logo: vendedor.logo,
      telefono: vendedor.telefono,
      info: vendedor.info,
    });
  };

  const handleEliminar = (id) => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar este vendedor y su usuario asociado?"
      )
    ) {
      // Encuentra el vendedor para obtener su usuarioId
      const vendedor = vendedores.find((vendedor) => vendedor.id === id);

      // Paso 1: Eliminar el vendedor
      fetch(`http://localhost:8080/colykke/vendedor/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error al eliminar el vendedor: ${response.status} ${response.statusText}`
            );
          }
          // Paso 2: Eliminar el usuario asociado
          return fetch(
            `http://localhost:8080/colykke/usuario/${vendedor.usuario.id}`,
            {
              method: "DELETE",
            }
          );
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error al eliminar el usuario asociado: ${response.status} ${response.statusText}`
            );
          }
          // Actualizar el estado local
          setVendedores((prevVendedores) =>
            prevVendedores.filter((vendedor) => vendedor.id !== id)
          );
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
    const body = {
      nombre: formData.nombre,
      logo: formData.logo,
      telefono: parseInt(formData.telefono, 10), // Asegúrate de enviar un número entero
      info: formData.info,
      usuarioId: editandoVendedor.usuario.id, // Incluye el ID del usuario asociado
    };
  
    console.log("Datos enviados al backend:", body); // Depuración
  
    fetch(`http://localhost:8080/colykke/vendedor/${editandoVendedor.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(
              `Error al actualizar el vendedor: ${response.status} ${response.statusText} - ${error.message}`
            );
          });
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
    // Paso 1: Crear el usuario asociado
    fetch("http://localhost:8080/colykke/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: nuevoVendedor.email,
        username: nuevoVendedor.username,
        password: nuevoVendedor.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error al crear el usuario: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((usuarioCreado) => {
        // Paso 2: Crear el vendedor asociado al usuario
        return fetch("http://localhost:8080/colykke/vendedor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nuevoVendedor.nombre,
            usuarioId: usuarioCreado.data.id, // Asociar el usuario creado
            logo: nuevoVendedor.logo,
            telefono: nuevoVendedor.telefono,
            info: nuevoVendedor.info,
          }),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error al crear el vendedor: ${response.status} ${response.statusText}`
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
          email: "",
          username: "",
          password: "",
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
                  <th>Email</th>
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
                    <td>{vendedor.usuario.email}</td>
                    <td>
                      <img
                        src={vendedor.logo}
                        alt="Logo"
                        style={{ width: "50px" }}
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
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={nuevoVendedor.email}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Username:
                    <input
                      type="text"
                      name="username"
                      value={nuevoVendedor.username}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Contraseña:
                    <input
                      type="password"
                      name="password"
                      value={nuevoVendedor.password}
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
