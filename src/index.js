import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/authContext'; // 👈 Importa tu context

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>     {/* 👈 Aquí envuelves tu app */}
    <App />
  </AuthProvider>
);

reportWebVitals();
