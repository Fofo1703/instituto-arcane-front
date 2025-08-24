import axiosInstance, { setAccessToken } from "./axiosInstance";
import { VALIDAR_CREDENCIALES, VERIFICARSESION, LOGOUT, RECORDAR_CREDENCIALES } from "../assets/Api/apiLinks";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

// 🔹 Login normal
// export async function validarCredenciales(usuario) {
//   const options = {
//     method: "POST",
//     url: VALIDAR_CREDENCIALES,
//     data: usuario,
//     withCredentials: true,
//   };

//   return axiosInstance
//     .request(options)
//     .then((response) => {
//       const { accessToken } = response.data;
//       const payload = jwtDecode(accessToken);

//       // Guardamos el token en memoria
//       setAccessToken(accessToken);

//       return {success: true,usuario: payload,};
//     })
//     .catch((error) => {
//       return {
//         success: false,
//         message: error.response?.data?.message || "Error al iniciar sesión",
//       };
//     });
// }

export async function validarCredenciales(usuario) {
  const options = {
    method: "POST",
    url: VALIDAR_CREDENCIALES,
    data: usuario,
    withCredentials: true,
  };

  return axiosInstance
    .request(options)
    .then((response) => {
      const { accessToken } = response.data;
      const payload = jwtDecode(accessToken);

      return {success: true, accessToken,usuario: payload,};
    })
    .catch((error) => {
      return {
        success: false,
        message: error.response?.data?.message || "Error al iniciar sesión",
      };
    });
}

export async function verificarSesion() {
  const options = {
    method: "POST",
    url: VERIFICARSESION,
    withCredentials: true,
  };

  return axiosInstance
    .request(options)
    .then((response) => {

      const { accessToken } = response.data;
      const payload = jwtDecode(accessToken);

      setAccessToken(accessToken);
      return { ok: true, usuario: payload };
    })
    .catch((error) => {
      return { ok: false };
    });
}

export async function logoutUsuario() {
  const options = {
    method: "POST",
    url: LOGOUT,
    withCredentials: true,
  };

  return axiosInstance
    .request(options)
    .then((response) => {

      Swal.fire("Sesión cerrada", response.data.message, "success");
      return { success: true };
    })
    .catch((error) => {

      Swal.fire("Error", error.response?.data?.message || "Error al cerrar sesión", "error");
      return { success: false };
    });
}

export async function recordarCredenciales() {
  const options = {
    method: "GET",
    url: RECORDAR_CREDENCIALES,
    withCredentials: true,
  };

  return axiosInstance
    .request(options)
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
      });
      return { success: true, message: response.data.message };
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "Error",
        showConfirmButton: false,
        timer: 1500
      });
    });
}
