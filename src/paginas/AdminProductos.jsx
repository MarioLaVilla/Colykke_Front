import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AdminMenu.css";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    color: "",
    precio: "",
    imagen: "",
    vendedor: "",
  });

  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    color: "",
    precio: "",
    imagen: "",
    vendedor: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/colykke/producto")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setProductos(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    fetch("http://localhost:8080/colykke/vendedor")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Error al obtener vendedores: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        setVendedores(data.data);
      })
      .catch((err) => {
        setError("Error al obtener los vendedores: " + err.message);
      });
  }, []);

  const handleEditar = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    setEditandoProducto(producto);
    setFormData({ ...producto, vendedor: producto.vendedor?.id || "" });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      fetch(`http://localhost:8080/colykke/producto/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error del servidor: ${response.status} ${response.statusText}`
            );
          }
          setProductos((prevProductos) =>
            prevProductos.filter((producto) => producto.id !== id)
          );
        })
        .catch((err) => {
          setError(`Error al eliminar el producto: ${err.message}`);
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
    fetch(`http://localhost:8080/colykke/producto/${editandoProducto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        idVendedor: formData.vendedor,
        vendedor: undefined,
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
      .then((updatedProducto) => {
        setProductos((prevProductos) =>
          prevProductos.map((producto) =>
            producto.id === updatedProducto.data.id
              ? updatedProducto.data
              : producto
          )
        );
        setEditandoProducto(null);
      })
      .catch((err) => {
        setError(`Error al actualizar el producto: ${err.message}`);
      });
  };

  const handleChangeNuevo = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgregarNuevoProducto = () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.vendedor) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }
  
    // Ajustar el payload para coincidir con el ProductoRequestDto del backend
    const payload = {
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      color: nuevoProducto.color,
      precio: parseFloat(nuevoProducto.precio),
      imagen: nuevoProducto.imagen,
      vendedorId: parseInt(nuevoProducto.vendedor, 10), // `vendedorId` debe coincidir con el backend
    };
  
    fetch("http://localhost:8080/colykke/producto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error del servidor: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((productoCreado) => {
        setProductos((prevProductos) => [...prevProductos, productoCreado.data]);
        setMostrarFormularioNuevo(false);
        setNuevoProducto({
          nombre: "",
          descripcion: "",
          color: "",
          precio: "",
          imagen: "",
          vendedor: "",
        });
      })
      .catch((err) => {
        setError(`Error al agregar nuevo producto: ${err.message}`);
      });
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
          className="añadirproducto"
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
                  <th>Descripción</th>
                  <th>Color</th>
                  <th>Precio</th>
                  <th>Imagen</th>
                  <th>Vendedor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.color}</td>
                    <td>{producto.precio}</td>
                    <td>
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                      />
                    </td>
                    <td>
                      {producto.vendedor
                        ? producto.vendedor.nombre
                        : "Sin asignar"}
                    </td>
                    <td className="acciones">
                      <button
                        className="btn-accion"
                        onClick={() => handleEditar(producto.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-accion"
                        onClick={() => handleEliminar(producto.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editandoProducto && (
            <div className="form-edicion">
              <h3>Editando Producto</h3>
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
                  Descripción:
                  <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Color:
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Precio:
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Imagen:
                  <input
                    type="text"
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                  />
                </label>
                <button type="button" onClick={handleGuardar}>
                  Guardar
                </button>
                <button type="button" onClick={() => setEditandoProducto(null)}>
                  Cancelar
                </button>
              </form>
            </div>
          )}
          {mostrarFormularioNuevo && (
            <div className="modal">
              <div className="modal-content">
                <h3>Agregar Nuevo Producto</h3>
                <form>
                  <label>
                    Nombre:
                    <input
                      type="text"
                      name="nombre"
                      value={nuevoProducto.nombre}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Descripción:
                    <input
                      type="text"
                      name="descripcion"
                      value={nuevoProducto.descripcion}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Color:
                    <input
                      type="text"
                      name="color"
                      value={nuevoProducto.color}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Precio:
                    <input
                      type="number"
                      name="precio"
                      value={nuevoProducto.precio}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Imagen (URL):
                    <input
                      type="text"
                      name="imagen"
                      value={nuevoProducto.imagen}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Vendedor:
                    <select
                      name="vendedor"
                      value={nuevoProducto.vendedor}
                      onChange={handleChangeNuevo}
                    >
                      <option value="">Seleccione un vendedor</option>
                      {vendedores.map((vendedor) => (
                        <option key={vendedor.id} value={vendedor.id}>
                          {vendedor.nombre}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button type="button" onClick={handleAgregarNuevoProducto}>
                    Agregar
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

export default AdminProductos;
