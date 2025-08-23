import axios from 'axios';

let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:444/api/v1', // API en puerto 444
  withCredentials: true,
});

// Interceptor de solicitudes: agrega el token si está disponible
axiosInstance.interceptors.request.use((config) => {
  // ✅ Fallback por si no está seteado aún el token en memoria
  const token = accessToken || localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuestas: maneja expiración del token (401)
axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // ⚠️ No intentar renovar si el error viene del login o del mismo refresh
    const isLoginOrRefresh =
      originalRequest.url.includes('/auth/login') ||
      originalRequest.url.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isLoginOrRefresh) {
      originalRequest._retry = true;

      try {
        // Usar axios normal (no axiosInstance) para evitar interceptores
        const res = await axios.post(
          'http://localhost:444/api/v1/auth/refresh',
          {},
          { withCredentials: true }
        );

        const nuevoAccessToken = res.data.accessToken;

        // Guardar nuevo token
        setAccessToken(nuevoAccessToken);
        localStorage.setItem("accessToken", nuevoAccessToken);

        // Reintentar la solicitud original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${nuevoAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Si el refresh falla, marcar como error de autenticación
        return Promise.reject({ ...err, isAuthError: true });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
