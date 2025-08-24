import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ roles }) => {
  const { usuario, authReady } = useAuth();
  
  if (!authReady) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-violet-500 border-dashed rounded-full animate-spin mb-4"></div>
        {/* Texto */}
        <p className="text-gray-700 text-lg font-medium">Cargando, por favor espere...</p>
      </div>
    </div>
  );
}

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/no-autorizado" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


