import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AdminMenu.css";

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editandoPedido, setEditandoPedido] = useState(null);
  const [formData, setFormData] = useState({
    direccion: "",
    clienteId: "",
    productosIds: [],
  });

  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [nuevoPedido, setNuevoPedido] = useState({
    direccion: "",
    clienteId: "",
    productosIds: [],
  });
  const [error, setError] = useState(null);
  const [productosModal, setProductosModal] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    Promise.all([
      fetch("http://localhost:8080/colykke/pedido"),
      fetch("http://localhost:8080/colykke/cliente"),
      fetch("http://localhost:8080/colykke/producto"),
    ])
      .then(async ([pedidosRes, clientesRes, productosRes]) => {
        if (!pedidosRes.ok || !clientesRes.ok || !productosRes.ok) {
          throw new Error("Error al obtener los datos");
        }
        const pedidosData = await pedidosRes.json();
        const clientesData = await clientesRes.json();
        const productosData = await productosRes.json();
        setPedidos(pedidosData.data);
        setClientes(clientesData.data);
        setProductos(productosData.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleEditar = (id) => {
    const pedido = pedidos.find((pedido) => pedido.id === id);
    setEditandoPedido(pedido);
    setFormData({
      direccion: pedido.direccion,
      clienteId: pedido.cliente?.id || "",
      productosIds: pedido.productos?.map((producto) => producto.id) || [],
    });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
      fetch(`http://localhost:8080/colykke/pedido/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error del servidor: ${response.status} ${response.statusText}`
            );
          }
          setPedidos((prevPedidos) =>
            prevPedidos.filter((pedido) => pedido.id !== id)
          );
        })
        .catch((err) => {
          setError(`Error al eliminar el pedido: ${err.message}`);
        });
    }
  };

  const handleVerProductos = (productos) => {
    if (productos && productos.length > 0) {
      setProductosModal(productos);
    } else {
      alert("Este pedido no tiene productos asociados.");
    }
  };

  const handleCloseProductosModal = () => {
    setProductosModal(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "productosIds") {
      setFormData({
        ...formData,
        productosIds: Array.from(e.target.selectedOptions, (option) => option.value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleGuardar = () => {
    fetch(`http://localhost:8080/colykke/pedido/${editandoPedido.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        direccion: formData.direccion,
        clienteId: parseInt(formData.clienteId),
        productosIds: formData.productosIds.map((id) => parseInt(id)),
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
      .then((updatedPedido) => {
        setPedidos((prevPedidos) =>
          prevPedidos.map((pedido) =>
            pedido.id === updatedPedido.data.id ? updatedPedido.data : pedido
          )
        );
        setEditandoPedido(null);
        cargarDatos();
      })
      .catch((err) => {
        setError(`Error al actualizar el pedido: ${err.message}`);
      });
  };

  const handleChangeNuevo = (e) => {
    const { name, value } = e.target;
    if (name === "productosIds") {
      setNuevoPedido({
        ...nuevoPedido,
        productosIds: Array.from(e.target.selectedOptions, (option) => option.value),
      });
    } else {
      setNuevoPedido({
        ...nuevoPedido,
        [name]: value,
      });
    }
  };

  const handleAgregarNuevoPedido = () => {
    fetch("http://localhost:8080/colykke/pedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        direccion: nuevoPedido.direccion,
        clienteId: parseInt(nuevoPedido.clienteId),
        productosIds: nuevoPedido.productosIds.map((id) => parseInt(id)),
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
      .then((pedidoCreado) => {
        setPedidos((prevPedidos) => [...prevPedidos, pedidoCreado.data]);
        setMostrarFormularioNuevo(false);
        setNuevoPedido({
          direccion: "",
          clienteId: "",
          productosIds: [],
        });
        cargarDatos();
      })
      .catch((err) => {
        setError(`Error al agregar nuevo pedido: ${err.message}`);
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
                  <th>Dirección</th>
                  <th>Cliente</th>
                  <th>Productos</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{pedido.direccion}</td>
                    <td>{pedido.cliente?.nombre || "Sin asignar"}</td>
                    <td>
                      <button
                        className="btn-accion"
                        onClick={() => handleVerProductos(pedido.productos)}
                      >
                        Ver Productos
                      </button>
                    </td>
                    <td className="acciones">
                      <button
                        className="btn-accion"
                        onClick={() => handleEditar(pedido.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-accion"
                        onClick={() => handleEliminar(pedido.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {productosModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Productos del Pedido</h3>
                <ul>
                  {productosModal.map((producto) => (
                    <li key={producto.id}>{producto.nombre}</li>
                  ))}
                </ul>
                <button onClick={handleCloseProductosModal}>Cerrar</button>
              </div>
            </div>
          )}

          {editandoPedido && (
            <div className="form-edicion">
              <h3>Editando Pedido</h3>
              <form>
                <label>
                  Dirección:
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Cliente:
                  <select
                    name="clienteId"
                    value={formData.clienteId}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona un cliente</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nombre}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Productos:
                  <select
                    name="productosIds"
                    multiple
                    value={formData.productosIds}
                    onChange={handleChange}
                  >
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
                <button
                  type="button"
                  onClick={() => setEditandoPedido(null)}
                >
                  Cancelar
                </button>
              </form>
            </div>
          )}

          {mostrarFormularioNuevo && (
            <div className="modal">
              <div className="modal-content">
                <h3>Añadir Nuevo Pedido</h3>
                <form>
                  <label>
                    Dirección:
                    <input
                      type="text"
                      name="direccion"
                      value={nuevoPedido.direccion}
                      onChange={handleChangeNuevo}
                    />
                  </label>
                  <label>
                    Cliente:
                    <select
                      name="clienteId"
                      value={nuevoPedido.clienteId}
                      onChange={handleChangeNuevo}
                    >
                      <option value="">Selecciona un cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombre}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Productos:
                    <select
                      name="productosIds"
                      multiple
                      value={nuevoPedido.productosIds}
                      onChange={handleChangeNuevo}
                    >
                      {productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                          {producto.nombre}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button type="button" onClick={handleAgregarNuevoPedido}>
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

export default AdminPedidos;
