import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logoutUsuario, verificarSesion } from "../services/loginServices";
import { setAccessToken } from "../services/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authReady, setAuthReady] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  const login = (userInfo, accessToken) => {
    setUsuario(userInfo);
    setAccessToken(accessToken);
    setAuthReady(true);
  };

  const logout = async () => {
    try {
      const result = await logoutUsuario();
      if (result.success) {
        // Solo limpiar el frontend si el backend cerró la sesión
        setUsuario(null);
        setAccessToken(null);
        setAuthReady(false);
        navigate("/");
      }
    } catch (err) {
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
  };

  useEffect(() => {
    const checkSesion = async () => {
      
      const res = await verificarSesion();
      if (res.ok) {
        setUsuario(res.usuario);
        setAccessToken(res.accessToken); // guardamos el nuevo token en memoria
        setAuthReady(true);
      } else {
        setUsuario(null);
        setAccessToken(null);
        // setAuthReady(false);
      }
    };

    checkSesion();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, authReady, usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
