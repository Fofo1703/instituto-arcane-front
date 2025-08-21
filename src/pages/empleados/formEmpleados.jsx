import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  insertarEmpleado,
  obtenerUnEmpleado,
  actualizarEmpleado,
} from "../../services/empleadosServices";
import InputConValidacion from "../../components/inputConValidacion";
import SelectConValidacion from "../../components/selectConValidacion";
import Navbar from "../../components/navbar/navbar";
import Swal from "sweetalert2";
export default function FormEmpleados() {
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    telefono: "",
    nombreRol: "",
    carrera: "",
    correo: "",
    usuario: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      obtenerUnEmpleado(id)
        .then((data) => {
          setFormData({
            cedula: data.cedula || "",
            nombre: data.nombre || "",
            telefono: data.telefono || "",
            nombreRol: data.nombreRol || "",
            carrera: data.carrera || "",
            correo: data.correo || "",
            usuario: data.usuario || "",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error al obtener la informacion del estudiante",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      setFormData({
        cedula: "",
        nombre: "",
        telefono: "",
        nombreRol: "",
        carrera: "",
        correo: "",
        usuario: "",
        password: "",
      });
      setErrors({});
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "Este campo es obligatorio";
      }
    });

    if (formData.cedula.trim() && !/^\d{9}$/.test(formData.cedula)) {
      newErrors.cedula = "La cédula debe tener exactamente 9 dígitos";
    }

    if (formData.telefono.trim() && !/^\d{8}$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 8 dígitos";
    }

    if (formData.usuario.trim() && !/^[a-zñ]+\.[a-zñ]+$/.test(formData.usuario)) {
      newErrors.usuario = "Debe tener el formato nombre.apellidos, sin mayúsculas ni espacios ni caracteres especiales";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (id) {
      actualizarEmpleado(id, formData)
        .then((response) => {
          if (response.success) {
            Swal.fire({
              icon: "success",
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error al actualizar el estudiante",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      insertarEmpleado(formData)
        .then((response) => {
          if (response.success) {
            setFormData({
              cedula: "",
              nombre: "",
              telefono: "",
              nombreRol: "",
              carrera: "",
              correo: "",
              usuario: "",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error al registrar el estudiante",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-auto ml-auto mr-auto flex flex-col items-center justify-center text-center">
        <label className="text-5xl font-semibold mb-12 mt-12 lg:mt-0">
          Formulario de los Empleados
        </label>

        <div className="w-full flex items-center justify-center lg:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-white px-8 pt-6 pb-8 mb-4 rounded-3xl border-2"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <InputConValidacion
                id="cedula"
                name="cedula"
                label="Cédula"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="Ingrese el número de cédula"
                requerido
                validacion="numero"
                inputProps={{ maxLength: 9 }}
                inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                labelClassName="block text-gray-700 text-sm font-bold mb-2"
                error={errors.cedula}
              />

              <InputConValidacion
                id="nombre"
                name="nombre"
                label="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
                requerido
                validacion="texto"
                inputProps={{ maxLength: 50 }}
                inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                labelClassName="block text-gray-700 text-sm font-bold mb-2"
                error={errors.nombre}
              />
            </div>

            <InputConValidacion
              id="telefono"
              name="telefono"
              label="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ingrese el número de teléfono"
              requerido
              validacion="numero"
              inputProps={{ maxLength: 8 }}
              inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.telefono}
            />


            <SelectConValidacion
              id="nombreRol"
              name="nombreRol"
              label="Rol"
              value={formData.nombreRol}
              onChange={handleChange}
              requerido
              options={[
                { label: "Encargado de Registro", value: "encargado-registro" },
                { label: "Profesor", value: "profesor" },
              ]}
              selectClassName="text-sm"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.nombreRol}
            />

            <InputConValidacion
              id="carrera"
              name="carrera"
              label="Carrera"
              value={formData.carrera}
              onChange={handleChange}
              placeholder="Ingrese la carerera"
              requerido={formData.nombreRol === "profesor"}
              validacion="texto"
              inputProps={{ maxLength: 50 }}
              inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.carrera}
            />

            <InputConValidacion
              id="correo"
              name="correo"
              label="Correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingrese el correo"
              requerido
              validacion="email"
              inputProps={{ maxLength: 50 }}
              inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.correo}
            />

            <InputConValidacion
              id="usuario"
              name="usuario"
              label="Usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Ej: nombre.apellido1.apellido2"
              requerido
              validacion="usuario"
              inputProps={{ maxLength: 50 }}
              inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.usuario}
            />

            <InputConValidacion
              id="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              requerido
              validacion="password"
              inputProps={{ maxLength: 50 }}
              inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.password}
            />
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                type="submit"
                className="py-2 rounded-xl bg-blue-500 text-white text-lg font-bold hover:scale-[1.01] active:scale-[.98]"
              >
                {id ? "Actualizar" : "Registrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
