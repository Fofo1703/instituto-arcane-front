import axiosInstance, { setAccessToken } from "./axiosInstance";
import { VALIDAR_CREDENCIALES, LOGOUT, RECORDAR_CREDENCIALES } from "../assets/Api/apiLinks";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

// 🔹 Login normal
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

      // Opcional: persistir solo el usuario en sessionStorage
      sessionStorage.setItem("usuario", JSON.stringify(payload));
        
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

// 🔹 Logout
export async function logoutUsuario() {
  try {
    const res = await axiosInstance.post(LOGOUT, {}, { withCredentials: true });
    Swal.fire("Sesión cerrada", res.data.message, "success");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error al cerrar sesión",
    };
  }
}

// 🔹 Verificar sesión con refresh token (se llama al cargar la app)
export async function verificarSesion() {
  try {
    const res = await axiosInstance.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    const { accessToken } = res.data;
    const payload = jwtDecode(accessToken);

    setAccessToken(accessToken);
    sessionStorage.setItem("usuario", JSON.stringify(payload));

    return { ok: true, usuario: payload };
  } catch {
    return { ok: false };
  }
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
