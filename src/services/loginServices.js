import axiosInstance, { setAccessToken } from "./axiosInstance";
import { VALIDAR_CREDENCIALES, RECORDAR_CREDENCIALES } from "../assets/Api/apiLinks";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

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

      // Guardamos el token en memoria
      setAccessToken(accessToken);
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("usuario", JSON.stringify(payload)); // 👉 guardamos usuario

      return {
        success: true,
        accessToken,
        usuario: payload,
      };
    })
    .catch((error) => {
      return {
        success: false,
        message: error.response?.data?.message || "Error al iniciar sesión",
      };
    });
}

export async function recordarCredenciales() {
  return axiosInstance
    .get(RECORDAR_CREDENCIALES)
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

