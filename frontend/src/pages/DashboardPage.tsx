import { type FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/userService';
import './DashboardPage.css';

const statTiles = [
  { label: 'Current sprint focus', value: 'Experience', accent: '#92f4ff' },
  { label: 'Active collaborators', value: '12', accent: '#7c5dff' },
  { label: 'AI prompts left', value: '∞ in Pro trial', accent: '#ffb347' },
];

const DashboardPage = () => {
  const { user, updateUserLocally } = useAuth();
  const [bio, setBio] = useState(user?.profile?.bio || '');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleProfile = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const { user: updated } = await userService.updateProfile({
        profile: { ...user?.profile, bio },
      });
      updateUserLocally(updated);
      setStatus('Profile refreshed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="dashboard">
      <div className="stats-grid">
        {statTiles.map((tile) => (
          <div key={tile.label} className="glass-panel stat-tile">
            <small>{tile.label}</small>
            <strong style={{ color: tile.accent }}>{tile.value}</strong>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel profile-panel">
          <h3>Profile</h3>
          <p>Name: {user?.username}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
          <p>Plan: {user?.plan}</p>
        </div>
        <form className="glass-panel edit-panel" onSubmit={handleProfile}>
          <h3>Edit profile</h3>
          <textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder="Leave a note for teammates or judges…"
          />
          {status && <small className="success-note">{status}</small>}
          <button className="cta-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save details'}
          </button>
        </form>
        <div className="glass-panel preferences-panel">
          <h3>Preferences</h3>
          <ul>
            <li>Theme: System adaptive</li>
            <li>Notifications: Enabled</li>
            <li>Workspace: Hackathon sprint</li>
          </ul>
          <p>Customize these later in `services/userService.ts` for real data.</p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;

