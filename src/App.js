
import PublicRoutes from './routes/routes';
import AutoLogout from './components/autoLogout';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <AuthProvider>
      <AutoLogout />
      <PublicRoutes />
    </AuthProvider>
  );
}

export default App;
