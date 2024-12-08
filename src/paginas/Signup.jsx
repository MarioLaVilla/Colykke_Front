import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './Signup.css';
import bcrypt from 'bcryptjs';
import DOMPurify from 'dompurify';

export default function Signup() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    correo: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Limpiar error cuando el usuario empiece a escribir
  };

  const validateForm = () => {
    if (!formData.username || !formData.password || !formData.confirmPassword || !formData.correo) {
      setError("Por favor, completa todos los campos.");
      return false;
    }

    if (formData.username.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    if (!formData.correo.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Por favor, introduce un correo electrónico válido");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    setIsLoading(true);
    setError("");
  
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(formData.password, 12);
  
    const data = {
      username: formData.username,
      password: hashedPassword, // Usa la contraseña encriptada
      correo: formData.correo,
    };
  
    try {
      const response = await fetch("http://localhost:8080/colykke/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        navigate("/login");
      } else {
        // Sanitizar el mensaje de error
        const sanitizedMessage = DOMPurify.sanitize(responseData.message || "Error al registrar el usuario");
        setError(sanitizedMessage);
      }
    } catch (error) {
      setError("Error de conexión. Por favor, intenta más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='signup-container'>
        <Link to="/" className="back-arrow">←</Link>
      <div className='logo-container'>
        <img src='logo.png' alt='Logo' className='logo' />
        {error && <p className="error" dangerouslySetInnerHTML={{ __html: error }} />}
      </div>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre de usuario
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder='Introduzca su nombre de usuario'
              minLength="3"
              required
            />
          </label>
          <br />
          <label>
            Correo electrónico
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder='Introduzca su email'
              required
            />
          </label>
          <br />
          <label>
            Contraseña
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Introduzca su contraseña'
              minLength="6"
              required
            />
          </label>
          <br />
          <label>
            Confirmar contraseña
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirme su contraseña'
              minLength="6"
              required
            />
          </label>
          <br />
          <button 
            type="submit" 
            disabled={isLoading}
            className={`signup-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
}