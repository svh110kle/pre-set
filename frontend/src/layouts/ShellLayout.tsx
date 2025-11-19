import { Navigate, Outlet } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import TopHeader from '../components/TopHeader';
import FooterPanel from '../components/FooterPanel';
import { useAuth } from '../hooks/useAuth';
import './ShellLayout.css';

const ShellLayout = () => {
  const { user, loading } = useAuth();

  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="shell-layout">
      <SidebarNav />
      <div className="shell-main">
        <TopHeader />
        <main>
          <Outlet />
        </main>
        <FooterPanel />
      </div>
    </div>
  );
};

export default ShellLayout;

