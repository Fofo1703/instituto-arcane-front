import { useAuth } from "../context/authContext";
import { useEffect } from "react";

const AutoLogout = () => {
  const { logout, accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;

    const LOGOUT_TIME = 30 * 60 * 1000; // 30 minutos
    const logoutTimer = setTimeout(() => {
      logout();
      window.location.href = "/";
    }, LOGOUT_TIME);

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      // Reinicia el timer si hay actividad
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [accessToken, logout]);

  return null;
};

export default AutoLogout;