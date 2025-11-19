import { useAuth } from '../hooks/useAuth';
import './TopHeader.css';

const TopHeader = () => {
  const { user } = useAuth();

  return (
    <header className="top-header glass-panel">
      <div>
        <p className="eyebrow">Live hack mode</p>
        <h2>Hi {user?.username ?? 'there'}, your cockpit is synced.</h2>
      </div>
      <div className="profile-chip">
        <div>
          <strong>{user?.username}</strong>
          <small>{user?.role} · {user?.plan} plan</small>
        </div>
        <div className="avatar">{user?.username?.[0] ?? 'U'}</div>
      </div>
    </header>
  );
};

export default TopHeader;

