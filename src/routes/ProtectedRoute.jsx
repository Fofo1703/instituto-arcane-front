import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  const usuarioGuardado = sessionStorage.getItem("usuario");
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  
  if (!usuario) {
    // No autenticado, enviar a login
    return <Navigate to="/" />;
  }

  if (roles && !roles.includes(usuario.rol)) {
    // Usuario autenticado pero sin permiso
    return <Navigate to="/no-autorizado" />;
  }

  // Usuario autenticado y autorizado
  return <Outlet />;
};

export default ProtectedRoute;

