import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook de navegación
import bcrypt from "bcryptjs";
import "./Admin.css";

function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para navegar

  const storedPassword = "1234";
  const hashedPassword = bcrypt.hashSync(storedPassword, 10);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (bcrypt.compareSync(password, hashedPassword)) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Contraseña incorrecta. Intenta de nuevo.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button className="EntrarAdmin" type="submit">
            Entrar
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="panel-admin">
        <button
          className="admin-button"
          onClick={() => navigate("/admintodopoderoso/adminclientes")}
        >
          Clientes
        </button>
        <button
          className="admin-button"
          onClick={() => navigate("/admintodopoderoso/adminvendedores")}
        >
          Vendedores
        </button>
        <button
          className="admin-button"
          onClick={() => navigate("/admintodopoderoso/adminusuarios")}
        >
          Usuarios
        </button>
        <button
          className="admin-button"
          onClick={() => navigate("/admintodopoderoso/adminproductos")}
        >
          Productos
        </button>
        <button
          className="admin-button"
          onClick={() => navigate("/admintodopoderoso/adminpedidos")}
        >
          Pedidos
        </button>
        <button
          className="admin-button"
          onClick={() => navigate("/admintodopoderoso/admincontiene")}
        >
          Contiene
        </button>
        <button
          className="admin-button"
          onClick={() => navigate("/admintodopoderoso/adminestadisticas")}
        >
          Estadísticas
        </button>
      </div>
    </div>
  );
}

export default Admin;
