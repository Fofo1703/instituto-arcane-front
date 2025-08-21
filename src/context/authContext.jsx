import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ importar useNavigate
import { logoutUsuario } from "../services/loginServices";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const navigate = useNavigate(); // ✅ hook de navegación

  const login = (token, userInfo) => {
    setAccessToken(token);
    setUsuario(userInfo);
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("usuario", JSON.stringify(userInfo));
    setAuthReady(true);
  };

  const logout = async () => {
    try {
      const result = await logoutUsuario(); // llamada al backend
      if (result.success) {
        // limpiar estado local
        setAccessToken(null);
        setUsuario(null);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("usuario");
        setAuthReady(false);

        // redirigir al login
        navigate("/");
      }
    } catch (error) {
      console.error("Error en logout:", error);

      // incluso si hay error, limpiar estado y redirigir
      setAccessToken(null);
      setUsuario(null);
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("usuario");
      setAuthReady(false);
      navigate("/");
    }
  };

  useEffect(() => {
    const tokenGuardado = sessionStorage.getItem("accessToken");
    const usuarioGuardado = sessionStorage.getItem("usuario");

    if (tokenGuardado && usuarioGuardado) {
      setAccessToken(tokenGuardado);
      setUsuario(JSON.parse(usuarioGuardado));
    }

    setAuthReady(true);
  }, []);



  return (
    <AuthContext.Provider value={{ accessToken, usuario, login, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

