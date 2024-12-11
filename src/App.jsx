import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Inicio from './paginas/Inicio.jsx';
import Marcas from './paginas/Marcas.jsx';
import Novedades from './paginas/Novedades.jsx';
import MasVendido from './paginas/MasVendido.jsx';
import Login from './paginas/Login.jsx';
import Signup from './paginas/Signup.jsx';
import About from './paginas/About.jsx';
import Admin from './paginas/Admin.jsx';
import AdminClientes from './paginas/AdminClientes.jsx';
import AdminUsuarios from './paginas/AdminUsuarios.jsx';
import AdminVendedores from './paginas/AdminVendedores.jsx';
import AdminProductos from './paginas/AdminProductos.jsx';
import AdminPedidos from './paginas/AdminPedidos.jsx';
import AdminContiene from './paginas/AdminContiene.jsx';
import AdminEstadisticas from './paginas/AdminEstadisticas.jsx';
import './index.css';
import './App.css';

const router = createBrowserRouter([
  { path: '/', element: <Inicio /> },
  { path: '/marcas', element: <Marcas /> },
  { path: '/novedades', element: <Novedades /> },
  { path: '/mas-vendido', element: <MasVendido /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/about', element: <About /> },
  { path: '/admintodopoderoso', element: <Admin /> },
  { path: '/admintodopoderoso/adminusuarios', element: <AdminUsuarios /> },
  { path: '/admintodopoderoso/adminvendedores', element: <AdminVendedores /> },
  { path: '/admintodopoderoso/adminclientes', element: <AdminClientes /> },
  { path: '/admintodopoderoso/adminproductos', element: <AdminProductos /> },
  { path: '/admintodopoderoso/adminpedidos', element: <AdminPedidos /> },
  { path: '/admintodopoderoso/admincontiene', element: <AdminContiene /> },
  { path: '/admintodopoderoso/adminestadisticas', element: <AdminEstadisticas /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
