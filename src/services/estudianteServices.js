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

export async function obtenerUnEstudiante(id) {

  const options = {
    method: "GET",
    url: OBTENER_UN_ESTUDIANTE+id,
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
        title: response.data.message,
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
        window.location.href = "/";
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
          title: "Ocurrio un error inesperado",
          text: error.response.data.message || "Ocurrio un error al registrar el estudiante.",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      return false;
    });
}

export async function actualizarEstudiante(id, estudiante) {
  const options = {
    method: "PATCH",
    withCredentials: true,
    url: ACTUALIZAR_ESTUDIANTE + id,
    data: estudiante,
  };

  // return await axios
  //   .request(options)
  //   .then((response) => {
  //     // Mostrar mensaje de éxito del backend
  //     return { success: true, message: response.data.message };
  //   })
  //   .catch((error) => {
  //     // Capturar el mensaje del backend en caso de error
  //     return { success: false, message: error.response?.data?.message };
  //   });
  return axiosInstance
    .request(options)
    .then((response) => {

      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

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
        await Swal.fire({
          icon: "error",
          title: "Acceso denegado",
          text: "No tenés permisos para ver esta información.",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ocurrio un error inesperado",
          text: error.response.data.message || "Ocurrio un error al actualizar el estudiante.",
          showConfirmButton: false,
          timer: 3000,
        });
      }

    });
}

export async function eliminarEstudiante(id) {
  const options = {
    method: "DELETE",
    withCredentials: true,
    url: ELIMINAR_ESTUDIANTE + id,
  };

  return axiosInstance
    .request(options)
    .then((response) => {
      return { success: true, message: response.data.message };
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
      return { success: false };
    });

}
