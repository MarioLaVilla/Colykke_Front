import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AdminMenu.css";

function AdminContiene() {
  const [contienes, setContienes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editandoContiene, setEditandoContiene] = useState(null);
  const [formData, setFormData] = useState({
    cantidad: "",
    pedido: "",
    producto: "",
  });
  const [nuevoContiene, setNuevoContiene] = useState({
    cantidad: "",
    pedido: "",
    producto: "",
  });
  const [error, setError] = useState(null);
  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);

  const navigate = useNavigate();

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

  const handleEditar = (id) => {
    const contiene = contienes.find((contiene) => contiene.id === id);
    setEditandoContiene(contiene);
    setFormData({
      cantidad: contiene.cantidad,
      pedido: contiene.pedido?.id || "",
      producto: contiene.producto?.id || "",
    });
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

  const handleGuardar = () => {
    fetch(`http://localhost:8080/colykke/contiene/${editandoContiene.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cantidad: formData.cantidad,
        pedido: { id: formData.pedido },
        producto: { id: formData.producto },
      }),
    })
      .then((response) => response.json())
      .then((updatedContiene) => {
        setContienes((prevContiene) =>
          prevContiene.map((contiene) =>
            contiene.id === updatedContiene.data.id
              ? updatedContiene.data
              : contiene
          )
        );
        setEditandoContiene(null);
      })
      .catch((err) => setError(`Error al actualizar el contiene: ${err.message}`));
  };

  const handleChangeNuevo = (e) => {
    setNuevoContiene({
      ...nuevoContiene,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgregarNuevoContiene = () => {
    if (
      !nuevoContiene.cantidad ||
      !nuevoContiene.pedido ||
      !nuevoContiene.producto
    ) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    fetch("http://localhost:8080/colykke/contiene", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cantidad: nuevoContiene.cantidad,
        pedido: { id: nuevoContiene.pedido },
        producto: { id: nuevoContiene.producto },
      }),
    })
      .then((response) => response.json())
      .then((contieneCreado) => {
        setContienes((prevContiene) => [...prevContiene, contieneCreado.data]);
        setMostrarFormularioNuevo(false);
        setNuevoContiene({
          cantidad: "",
          pedido: "",
          producto: "",
        });
      })
      .catch((err) => setError(`Error al agregar nuevo contiene: ${err.message}`));
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
          className="añadircontiene"
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
                  <th>Cantidad</th>
                  <th>Pedido</th>
                  <th>Producto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contienes.map((contiene) => (
                  <tr key={contiene.id}>
                    <td>{contiene.id}</td>
                    <td>{contiene.cantidad}</td>
                    <td>{contiene.pedido?.id || "Sin asignar"}</td>
                    <td>{contiene.producto?.nombre || "Sin asignar"}</td>
                    <td className="acciones">
                      <button
                        className="btn-accion"
                        onClick={() => handleEditar(contiene.id)}
                      >
                        ✏️
                      </button>
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

          {editandoContiene && (
            <div className="form-edicion">
              <h3>Editando Contiene</h3>
              <form>
                <label>
                  Cantidad:
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Pedido:
                  <select
                    name="pedido"
                    value={formData.pedido}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un pedido</option>
                    {pedidos.map((pedido) => (
                      <option key={pedido.id} value={pedido.id}>
                        {pedido.id}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Producto:
                  <select
                    name="producto"
                    value={formData.producto}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un producto</option>
                    {productos.map((producto) => (
                      <option key={producto.id} value={producto.id}>
                        {producto.nombre}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="button" onClick={handleGuardar}>
                  Guardar
                </button>
                <button type="button" onClick={() => setEditandoContiene(null)}>
                  Cancelar
                </button>
              </form>
            </div>
          )}

          {mostrarFormularioNuevo && (
            <div className="modal">
              <div className="modal-content">
                <h3>Agregar Nuevo Contiene</h3>
                <form>
                  <label>
                    Cantidad:
                    <input
                      type="number"
                      name="cantidad"
                      value={nuevoContiene.cantidad}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Pedido:
                    <select
                      name="pedido"
                      value={nuevoContiene.pedido}
                      onChange={handleChangeNuevo}
                    >
                      <option value="">Seleccione un pedido</option>
                      {pedidos.map((pedido) => (
                        <option key={pedido.id} value={pedido.id}>
                          {pedido.id}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Producto:
                    <select
                      name="producto"
                      value={nuevoContiene.producto}
                      onChange={handleChangeNuevo}
                    >
                      <option value="">Seleccione un producto</option>
                      {productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                          {producto.nombre}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button type="button" onClick={handleAgregarNuevoContiene}>
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

export default AdminContiene;
