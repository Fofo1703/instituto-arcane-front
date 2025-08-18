
import PublicRoutes from './routes/routes';
import AutoLogout from './components/autoLogout';
import { AuthProvider } from './context/authContext';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AutoLogout />
        <PublicRoutes />
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
