// import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "../routes/ProtectedRoute";
// import Login from "../pages/login/login";
// import ListaEstudiantes from "../pages/estudiantes/listaEstudiantes";
// import FormEstudiante from "../pages/estudiantes/formEstudiante";
// import ListaEmpleados from "../pages/empleados/listaEmpleados";
// import FormEmpleados from "../pages/empleados/formEmpleados";
// import ListaCursos from "../pages/cursos/listaCursos";
// import FormCursos from "../pages/cursos/formCursos";
// import FormHorarios from "../pages/horarios/formHorarios";
// import ListaHorarios from "../pages/horarios/listaHorarios";
// import FormMatriculacion from "../pages/estudiantes/matricularEstudiante";
// import ListaCursosPorEstudiante from "../pages/estudiantes/listaCursosPorEstudiantes";
// import NotasAusencias from "../pages/estudiantes/notasAusencias";
// import NoAutorizado from "../pages/noAutorizado/noAutorizado"; // página para acceso denegado

// const PublicRoutes = () => {
//   return (
//     <Routes>
//       {/* Ruta pública */}
//       <Route path="/" element={<Login />} />

//       {/* Rutas protegidas sin restricción de rol (solo autenticación) */}
//       <Route element={<ProtectedRoute />}>

//       </Route>

//       {/* Rutas protegidas con restricción por rol */}
//       <Route element={<ProtectedRoute roles={["administrador", "encargado-registro"]} />}>

//         <Route path="/estudiantes/registro" element={<FormEstudiante />} />
//         <Route path="/estudiantes/listaEstudiantes" element={<ListaEstudiantes />} />
//         <Route path="/cursos/listaCursos" element={<ListaCursos />} />
//         <Route path="/cursos/registro" element={<FormCursos />} />
//         <Route path="/estudiantes/listaEstudianteCursos" element={<ListaCursosPorEstudiante />} />
//         <Route path="/estudiantes/notasAusencias" element={<NotasAusencias />} />
//         <Route path="/horarios/registro" element={<FormHorarios />} />
//         <Route path="/horarios/listaHorarios" element={<ListaHorarios />} />
//       </Route>

//       <Route element={<ProtectedRoute roles={["administrador", "director"]} />}>
//         <Route path="/empleados/listaEmpleados" element={<ListaEmpleados />} />
//         <Route path="/empleados/registro" element={<FormEmpleados />} />
//       </Route>

//       <Route element={<ProtectedRoute roles={["administrador", "profesor"]} />}>

//       </Route>

//       <Route element={<ProtectedRoute roles={["administrador", "estudiante"]} />}>
//         <Route path="/estudiantes/matricularEstudiante" element={<FormMatriculacion />} />
//       </Route>

//       <Route path="/no-autorizado" element={<NoAutorizado />} />
//     </Routes>
//   );
// };

// export default PublicRoutes;



import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import Login from "../pages/login/login";
import ListaEstudiantes from "../pages/estudiantes/listaEstudiantes";
import FormEstudiante from "../pages/estudiantes/formEstudiante";
import ListaEmpleados from "../pages/empleados/listaEmpleados";
import FormEmpleados from "../pages/empleados/formEmpleados";
import ListaCursos from "../pages/cursos/listaCursos";
import FormCursos from "../pages/cursos/formCursos";
import FormHorarios from "../pages/horarios/formHorarios";
import ListaHorarios from "../pages/horarios/listaHorarios";
import FormMatriculacion from "../pages/estudiantes/matricularEstudiante";
import ListaCursosPorEstudiante from "../pages/estudiantes/listaCursosPorEstudiantes";
import NotasAusencias from "../pages/estudiantes/notasAusencias";
import NoAutorizado from "../pages/noAutorizado/noAutorizado";

const PublicRoutes = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute roles={["administrador", "encargado-registro"]} />}>
        <Route path="/estudiantes/registro" element={<FormEstudiante />} />
        <Route path="/estudiantes/listaEstudiantes" element={<ListaEstudiantes />} />
        <Route path="/cursos/listaCursos" element={<ListaCursos />} />
        <Route path="/cursos/registro" element={<FormCursos />} />
        <Route path="/estudiantes/listaEstudianteCursos" element={<ListaCursosPorEstudiante />} />
        <Route path="/estudiantes/notasAusencias" element={<NotasAusencias />} />
        <Route path="/horarios/registro" element={<FormHorarios />} />
        <Route path="/horarios/listaHorarios" element={<ListaHorarios />} />
      </Route>

      <Route element={<ProtectedRoute roles={["administrador", "director"]} />}>
        <Route path="/empleados/listaEmpleados" element={<ListaEmpleados />} />
        <Route path="/empleados/registro" element={<FormEmpleados />} />
      </Route>

      <Route element={<ProtectedRoute roles={["administrador", "profesor"]} />}>
        {/* futuras rutas de profesor */}
      </Route>

      <Route element={<ProtectedRoute roles={["administrador", "estudiante"]} />}>
        <Route path="/estudiantes/matricularEstudiante" element={<FormMatriculacion />} />
      </Route>

      {/* Página de acceso denegado */}
      <Route path="/no-autorizado" element={<NoAutorizado />} />
    </Routes>
  );
};

export default PublicRoutes;
