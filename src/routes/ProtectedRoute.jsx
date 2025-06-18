// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ isAuthenticated }) => {
//   return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
// };

// export default ProtectedRoute;

// src/routes/ProtectedRoute.jsx
import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  const { usuario } = useAuth();

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
