import axios from "axios";

let accessToken = null;

// Función para setear el accessToken en memoria
export function setAccessToken(token) {
  accessToken = token;
}

// Interceptor de solicitudes: agrega el token si está disponible
const axiosInstance = axios.create({
  baseURL: "http://localhost:444/api/v1",
  withCredentials: true, // importante para cookies
});

axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Interceptor de respuestas: maneja expiración del token (401)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    
    const originalRequest = error.config;

    const isLoginOrRefresh =
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isLoginOrRefresh
    ) {
      originalRequest._retry = true;

      try {
        // Hacer refresh con axios normal para evitar interceptor
        const res = await axios.post(
          "http://localhost:444/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );

        const nuevoAccessToken = res.data.accessToken;

        // Guardar token en memoria
        setAccessToken(nuevoAccessToken);

        // Reintentar la solicitud original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${nuevoAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Si falla el refresh, marcar como error de autenticación
        return Promise.reject({ ...err, isAuthError: true });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
