// import PublicRoutes from './routes/routes';

// function App() {
//   return (
//     <>
//       <PublicRoutes />

//     </>

//   );
// }

// export default App;

import PublicRoutes from './routes/routes';
import AutoLogout from './components/autoLogout';
 // importa tu componente AutoLogout
import { AuthProvider } from './context/authContext'; // importa el provider del contexto

function App() {
  return (
    <AuthProvider>
      <AutoLogout />
      <PublicRoutes />
    </AuthProvider>
  );
}

export default App;
