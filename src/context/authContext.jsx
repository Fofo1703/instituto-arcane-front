

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUsuario, verificarSesion } from "../services/loginServices";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authReady, setAuthReady] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  const login = ( userInfo) => {
    setUsuario(userInfo);
    setAuthReady(true);
  };

  const logout = async () => {
    try {
      await logoutUsuario();
    } catch (err) {
      console.error("Error en logout:", err);
    } finally {
      sessionStorage.removeItem("usuario");
      setUsuario(null);
      setAuthReady(false);
      navigate("/");
    }
  };

  useEffect(() => {
    async function checkSesion() {
      const res = await verificarSesion();
      if (res.ok) {
        setUsuario(res.usuario);
        setAuthReady(true);
      } else {
        setUsuario(null);
        setAuthReady(true);
      }
    }
    checkSesion();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, authReady, usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

