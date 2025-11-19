import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './AuthLayout.css';

const AuthLayout = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="auth-layout">
      <div className="auth-hero">
        <h1>Custom-built, pre-setup cockpit.</h1>
        <p>Plug in {'{{PROJECT_LOGO}}'} and you are launch-ready.</p>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

