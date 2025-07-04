import axios from "axios";
import axiosInstance from "./axiosInstance";
import Swal from "sweetalert2";
import {
  OBTENER_ESTUDIANTES,
  OBTENER_UN_ESTUDIANTE,
  INSERTAR_ESTUDIANTE,
  ACTUALIZAR_ESTUDIANTE,
  ELIMINAR_ESTUDIANTE,
} from "../assets/Api/apiLinks";

export async function obtenerEstudiantes() {
  console.log(OBTENER_ESTUDIANTES);

  const options = {
    method: "GET",
    url: OBTENER_ESTUDIANTES,
    withCredentials: true,
  };

  return axiosInstance
    .request(options)
    .then((response) => {
      return response.data;
    })
    .catch(async (error) => {
      if (error.isAuthError || error.response?.status === 401) {
        // 🔐 Error de autenticación (por ejemplo, token inválido o expirado)
        await Swal.fire({
          icon: "warning",
          title: "Sesión expirada",
          text: "Por favor, iniciá sesión de nuevo.",
          showConfirmButton: true,
        });
        // También podrías redirigir al login si querés:
        window.location.href = "/";
      } else if (error.response?.status === 403) {
        // 🚫 Error de autorización (no tiene permisos)
        Swal.fire({
          icon: "error",
          title: "Acceso denegado",
          text: "No tenés permisos para ver esta información.",
          showConfirmButton: true,
        });
      } else {
        // ⚠️ Otro tipo de error (conexión, server 500, etc.)
        Swal.fire({
          icon: "error",
          title: "Error al obtener estudiantes",
          text: error.response?.data?.message || "Ocurrió un error inesperado.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return [];
    });
}

// export async function obtenerEstudiantes() {
//   try {
//     const res = await axiosInstance.get(OBTENER_ESTUDIANTES);
//     return res.data;
//   } catch (error) {
//    if (error.isAuthError || error.response?.status === 401) {
//       // 🔐 Error de autenticación (por ejemplo, token inválido o expirado)
//      await Swal.fire({
//         icon: "warning",
//         title: "Sesión expirada",
//         text: "Por favor, iniciá sesión de nuevo.",
//         showConfirmButton: true,
//       });
//       // También podrías redirigir al login si querés:
//       // window.location.href = "/";
//     } else if (error.response?.status === 403) {
//       // 🚫 Error de autorización (no tiene permisos)
//       Swal.fire({
//         icon: "error",
//         title: "Acceso denegado",
//         text: "No tenés permisos para ver esta información.",
//         showConfirmButton: true,
//       });
//     } else {
//       // ⚠️ Otro tipo de error (conexión, server 500, etc.)
//       Swal.fire({
//         icon: "error",
//         title: "Error al obtener estudiantes",
//         text: error.response?.data?.message || "Ocurrió un error inesperado.",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//     return [];
//   }
// }

export async function obtenerUnEstudiante(id) {
  const options = {
    method: "GET",
    withCredentials: false,
    url: OBTENER_UN_ESTUDIANTE + id,
  };

  return await axios
    .request(options)
    .then(function (response) {
      return response.data[0];
    })
    .catch(function (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      return [];
    });
}

export async function insertarEstudiante(estudiante) {
  const options = {
    method: "POST",
    withCredentials: true,
    url: INSERTAR_ESTUDIANTE,
    data: estudiante,
  };

  return axiosInstance
    .request(options)
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
      return { success: true };
    })
    .catch(async (error) => {
      if (error.isAuthError || error.response?.status === 401) {
        // 🔐 Error de autenticación (por ejemplo, token inválido o expirado)
        await Swal.fire({
          icon: "warning",
          title: "Sesión expirada",
          text: "Por favor, iniciá sesión de nuevo.",
          showConfirmButton: true,
        });
        // También podrías redirigir al login si querés:
        // window.location.href = "/";
      } else if (error.response?.status === 403) {
        // 🚫 Error de autorización (no tiene permisos)
        await Swal.fire({
          icon: "error",
          title: "Acceso denegado",
          text: "No tenés permisos para ver esta información.",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: error.response?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return false;
    });
}

// export async function insertarEstudiante(estudiante) {
//   const options = {
//     method: "POST",
//     withCredentials: false,
//     url: INSERTAR_ESTUDIANTE,
//     data: estudiante,
//   };
//   return await axios
//     .request(options)
//     .then((response) => {
//       // Mostrar mensaje de éxito del backend
//       return { success: true, message: response.data.message };
//     })
//     .catch((error) => {
//       // Capturar el mensaje del backend en caso de error
//       return { success: false, message: error.response?.data?.message };
//     });
// }

export async function actualizarEstudiante(id, estudiante) {
  const options = {
    method: "PUT",
    withCredentials: false,
    url: ACTUALIZAR_ESTUDIANTE + id,
    data: estudiante,
  };

  return await axios
    .request(options)
    .then((response) => {
      // Mostrar mensaje de éxito del backend
      return { success: true, message: response.data.message };
    })
    .catch((error) => {
      // Capturar el mensaje del backend en caso de error
      return { success: false, message: error.response?.data?.message };
    });
}

export async function eliminarEstudiante(id) {
  const options = {
    method: "DELETE",
    withCredentials: false,
    url: ELIMINAR_ESTUDIANTE + id,
  };

  return await axios
    .request(options)
    .then(function (response) {
      return { success: true, message: response.data.message };
    })
    .catch(function (error) {
      return { success: false, message: error.response?.data?.message };
    });
}
