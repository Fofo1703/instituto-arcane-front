// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [usuario, setUsuario] = useState(null);

//   const login = (token, userInfo) => {
//     setAccessToken(token);
//     setUsuario(userInfo);
//   };

//   const logout = () => {
//     setAccessToken(null);
//     setUsuario(null);
//     sessionStorage.removeItem("accessToken");
//   };

//   // Recuperar token si la página se recarga
// useEffect(() => {
//   const tokenGuardado = sessionStorage.getItem("accessToken");
//   const usuarioGuardado = sessionStorage.getItem("usuario");

//   if (tokenGuardado && usuarioGuardado) {
//     setAccessToken(tokenGuardado);
//     setUsuario(JSON.parse(usuarioGuardado)); // 👉 lo restaurás aquí
//   }
// }, []);




//   return (
//     <AuthContext.Provider value={{ accessToken, usuario, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// authContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [authReady, setAuthReady] = useState(false); // 👈 nuevo

  const login = (token, userInfo) => {
    setAccessToken(token);
    setUsuario(userInfo);
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("usuario", JSON.stringify(userInfo));
    setAuthReady(true);
  };

  const logout = () => {
    setAccessToken(null);
    setUsuario(null);
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("usuario");
    setAuthReady(false);
  };

  useEffect(() => {
    const tokenGuardado = sessionStorage.getItem("accessToken");
    const usuarioGuardado = sessionStorage.getItem("usuario");

    if (tokenGuardado && usuarioGuardado) {
      setAccessToken(tokenGuardado);
      setUsuario(JSON.parse(usuarioGuardado));
    }

    setAuthReady(true); // 👉 se activa al finalizar el chequeo inicial
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, usuario, login, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

