import "./Login.css";
import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../auth/AuthContext"; 
import { Link } from "react-router-dom"; 
import bcrypt from "bcryptjs";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const { setToken, setAuthPassword } = useAuth();
  const token = useAuth().getToken();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSuccesfullLogin = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    // Encriptar la contraseña antes de enviarla al servidor
    const hashedPassword = await bcrypt.hash(loginData.password, 12);

    const response = await fetch("http://localhost:8080/colykke/cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginData.username,
        password: hashedPassword, // Usa la contraseña encriptada
      }),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok && typeof data.token === "string") {
      setAuthPassword(loginData.password);
      setToken(data.token);
      handleSuccesfullLogin();
    } else {
      setError("Usuario o contraseña incorrectos"); // Actualiza el estado del error
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="contenedor-pagina">
      <Link to="/" className="back-arrow">
        ←
      </Link>{" "}
      <div className="login-container">
        <img src="logo.png" alt="Colykke Logo" />
        <form>
          <label>Usuario</label>
          <input
            type="text"
            placeholder="Ingrese su usuario"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
          />
          <br />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <br />
          {error && <p className="error-message" dangerouslySetInnerHTML={{ __html: error }} />}
          <button className="iniciarsesion" onClick={handleSubmit}>
            Iniciar Sesión
          </button>
        </form>
        <p>
          ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;