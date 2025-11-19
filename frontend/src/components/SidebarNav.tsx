import { NavLink } from 'react-router-dom';
import { navLinks } from '../data/navLinks';
import './SidebarNav.css';
import { useAuth } from '../hooks/useAuth';

const SidebarNav = () => {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>{'{{PROJECT_LOGO}}'}</span>
        <small>{'{{PROJECT_NAME}}'}</small>
      </div>
      <nav className="sidebar-links">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <button className="sidebar-logout" onClick={logout}>
        Logout
      </button>
    </aside>
  );
};

export default SidebarNav;

