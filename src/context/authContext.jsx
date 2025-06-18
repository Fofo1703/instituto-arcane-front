import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [usuario, setUsuario] = useState(null); // Puedes guardar info como el rol también

  const login = (token, userInfo) => {
    setAccessToken(token);
    setUsuario(userInfo);
  };

  const logout = () => {
    setAccessToken(null);
    setUsuario(null);
    // Aquí podrías hacer una llamada al backend para eliminar la cookie de refresh
  };

  return (
    <AuthContext.Provider value={{ accessToken, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);