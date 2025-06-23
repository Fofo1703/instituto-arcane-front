// import axios from 'axios';

// let accessToken = null;

// export function setAccessToken(token) {
//   accessToken = token;
// }

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:444/api/v1', // tu API base
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use((config) => {
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   response => response,
//   async (error) => {
//     const originalRequest = error.config;

// if (error.response?.status === 401 && !originalRequest._retry) {
//   originalRequest._retry = true;
//   try {
//     const res = await axiosInstance.post('/auth/refresh', {}, { withCredentials: true });
//     const nuevoAccessToken = res.data.accessToken;

//     setAccessToken(nuevoAccessToken);
//     originalRequest.headers.Authorization = `Bearer ${nuevoAccessToken}`;
//     return axiosInstance(originalRequest);
//   } catch (err) {
//     // 👉 Enviamos una marca para que el contexto maneje el logout
//     return Promise.reject({ ...err, isAuthError: true });
//   }
// }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from 'axios';

let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:444/api/v1', // API en puerto 444
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  // ✅ Fallback por si no está seteado aún el token en memoria
  const token = accessToken || sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   response => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.post(
//           'http://localhost:444/api/v1/auth/refresh', // 👈 usar URL completa
//           {},
//           { withCredentials: true }
//         );

//         const nuevoAccessToken = res.data.accessToken;
//         setAccessToken(nuevoAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${nuevoAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         return Promise.reject({ ...err, isAuthError: true });
//       }
//     }
// Interceptor de respuesta (manejo de 401 + refresh)
axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Usamos axios normal (no el axiosInstance) para evitar bucles
        const res = await axios.post(
          'http://localhost:444/api/v1/auth/refresh',
          {},
          { withCredentials: true }
        );

        const nuevoAccessToken = res.data.accessToken;

        setAccessToken(nuevoAccessToken);
        sessionStorage.setItem("accessToken", nuevoAccessToken); // por si refrescan luego

        // Reintentar la solicitud original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${nuevoAccessToken}`;
        return axiosInstance(originalRequest);

      } catch (err) {
        // Redirigir o indicar que se debe hacer logout
        return Promise.reject({ ...err, isAuthError: true });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
