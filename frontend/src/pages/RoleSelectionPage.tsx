import { useNavigate } from 'react-router-dom';
import { roleOptions } from '../data/navLinks';
import { userService } from '../services/userService';
import { useAuth } from '../hooks/useAuth';
import './RoleSelectionPage.css';
import { useState } from 'react';

const RoleSelectionPage = () => {
  const { updateUserLocally, user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState<string | null>(null);

  const handleSelect = async (role: string) => {
    try {
      setSaving(role);
      const { user: updated } = await userService.updateRole(role);
      updateUserLocally(updated);
      navigate('/dashboard');
    } finally {
      setSaving(null);
    }
  };

  return (
    <section className="role-page glass-panel">
      <p className="eyebrow">Step 02</p>
      <h2>Choose how you show up.</h2>
      <p>Roles are fully editable later. Pick your starting point.</p>
      <div className="role-grid">
        {roleOptions.map((role) => (
          <button
            key={role.label}
            className={`role-card ${user?.role === role.label ? 'active' : ''}`}
            onClick={() => handleSelect(role.label)}
            disabled={saving === role.label}
          >
            <h3>{role.label}</h3>
            <p>{role.description}</p>
            <span>{saving === role.label ? 'Saving...' : 'Select role'}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default RoleSelectionPage;

