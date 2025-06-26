import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import Login from "../pages/login/login";
import ListaEstudiantes from "../pages/estudiantes/listaEstudiantes";
import FormEstudiante from "../pages/estudiantes/formEstudiante";
import ListaProfesores from "../pages/profesoresCursos/listaProfesores";
import ListaCursos from "../pages/profesoresCursos/listaCursos";
import FormProfesoresCursosHorarios from "../pages/profesoresCursos/FormsProfesoresCursos";
import FormHorarios from "../pages/horarios/formHorarios";
import ListaHorarios from "../pages/horarios/listaHorarios";
import FormMatriculacion from "../pages/estudiantes/matricularEstudiante";
import ListaEstudianteCursos from "../pages/estudiantes/listaEstudianteCursos";
import NotasAusencias from "../pages/estudiantes/notasAusencias";
import NoAutorizado from "../pages/noAutorizado/noAutorizado"; // página para acceso denegado

const PublicRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas sin restricción de rol (solo autenticación) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/estudiantes/listaEstudiantes" element={<ListaEstudiantes />} />
          <Route path="/estudiantes/registro" element={<FormEstudiante />} />
          <Route path="/profesores/listaProfesores" element={<ListaProfesores />} />
          <Route path="/formsProfesoresCursos/registro" element={<FormProfesoresCursosHorarios />} />
          <Route path="/estudiantes/matricularEstudiante" element={<FormMatriculacion />} />
          <Route path="/estudiantes/listaEstudianteCursos" element={<ListaEstudianteCursos />} />
          <Route path="/estudiantes/notasAusencias" element={<NotasAusencias />} />
          <Route path="/horarios/registro" element={<FormHorarios />} />
          <Route path="/cursos/listaCursos" element={<ListaCursos />} />
          <Route path="/horarios/listaHorarios" element={<ListaHorarios />} />
        </Route>

        {/* Rutas protegidas con restricción por rol */}
        <Route element={<ProtectedRoute roles={["administrador","encargado-registro"]} />}>
          {/* <Route path="/horarios/registro" element={<FormHorarios />} />
          <Route path="/cursos/listaCursos" element={<ListaCursos />} />
          <Route path="/horarios/listaHorarios" element={<ListaHorarios />} /> */}
        </Route>

        <Route path="/no-autorizado" element={<NoAutorizado />} />
      </Routes>
    </Router>
  );
};

export default PublicRoutes;
